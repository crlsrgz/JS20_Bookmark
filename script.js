const modal =  document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];


// Show Modal, Focus input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event listener

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {modal.classList.remove('show-modal')});
window.addEventListener('click', (event) => {
// console.log(event.target);
event.target === modal ? modal.classList.remove('show-modal'): false;
});

/*::::::::::::::::::::::::::
    Validate Form 
::::::::::::::::::::::::::::*/

function validate(nameValue, urlValue) {
  // 💡 Check this regular expression, ans see if it is understandable
  // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if(!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  // Working code removed
  // if (urlValue.match(regex)) {
  //   alert('match');
  // } 
  if (!urlValue.match(regex)) {
    alert('Please provide a valiu web address')
    return false;
  }
  
  // Valid
  return true;

}

// Building bookmarks DOM

function buildBookmarks() {
  //Remove contents of container before rebuilding bookmarks
  bookmarksContainer.innerHTML = '';
  
  bookmarks.forEach(bookmark => {
    const {name, url} = bookmark;
    
    
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-sharp', 'fa-solid', 'fa-xmark');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    //💡 In the following template string quotes are used in the parameter of the function  
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)
    //favicon / link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    //favicon

    const favicon = document.createElement('img');
    favicon.setAttribute('src', `http://www.google.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');

    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    // Append to bookmark container
    // item.appendChild(closeIcon);
    // linkInfo.appendChild(favicon);
    // linkInfo.appendChild(link);
    // item.appendChild(linkInfo);
    // bookmarksContainer.appendChild(item);

    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);

  });
}

//Delete bookmarks
function deleteBookmark(url){
  //📗 Splice method 
  bookmarks.forEach((bookmark, i) => {
    if(bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });

  // update bookmarks array in local storage and repopulate dom

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookmarks();
}


// Fetch bookmarks from local storage
function fetchBookmarks() {
  // 
  if (localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create a bookmarks array
    bookmarks = [{
      name: 'Jacinto',
      url: 'https:jacinto.design',
    }];

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Handle Data from From

function storeBookmark(event) {
  event.preventDefault();

  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // 💡 Includes accepts just one parameter 
  if(!urlValue.includes('https://') && !urlValue.includes('http://')){
    urlValue = `https://${urlValue}`
  }
  //console.log(nameValue, urlValue);

  //💡 If validate functions is false, run the if statement
  // url or the regex for the url return false then don't run.
  // but if it's true then ignore the following code.
  if (!validate(nameValue, urlValue)){
    return false;
  } 

  const bookmark = {
    name: nameValue,
    url: urlValue,
  }

  bookmarks.push(bookmark);
  //console.log(bookmark);

  // Local storage
  //💡 Save objects as a string in local storage, 
  // set item uses a key and a value {} = bookmarks,  use JSONs.stringify() 
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  fetchBookmarks();

  bookmarkForm.reset();  
  websiteNameEl.focus(); //💡 Returns the cursor to the element
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// Onload
fetchBookmarks();

// 106. //📗 
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify