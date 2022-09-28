const modal =  document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

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

function validate(namevalue, urlValue) {
  // 💡 Check this regular expression, ans see if it is understandable
  // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (urlValue.match(regex)) {
    alert('match');
  } 
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address')
    return false;
  }
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
  console.log(nameValue, urlValue);
  validate(nameValue, urlValue)

}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

