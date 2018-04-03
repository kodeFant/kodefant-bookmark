/* bling.js */

window.$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
}

// Selects all bookmark links
const bmLink = $('.bmLink');
//Selects all carets
const allCarets = $('.caret');
// Select url input
const urlInput = document.querySelector('#url');
// Select bookmark title  input
const bmTitleInput = document.querySelector('#name');
// Select Edit buttons
const editButtons = $('.editButton');
// Select UL
const bmUL = document.querySelector('#bmList');
// Select all list items
const bmLIs = $('li');

// Adds click listener to all bookmark links
for (i = 0; i < bmLink.length; i++){
bmLink[i].addEventListener('click', () => {
  // Reloads when link is loaded
  window.location.reload(true);
  })
};


for (i = 0; i < allCarets.length;i++) {
  const caret = allCarets[i];
  const bmID = caret.getAttribute('data-editbm');
  const parentLI = bmLIs[i];
  caret.addEventListener('click', () => {
    if (caret.classList.contains('pulldown')) {
      closeAllCarets();
    } else {
    closeAllCarets();
    caret.classList.toggle('pulldown');
    parentLI.querySelector('.bm-row').classList.toggle("box");
    parentLI.querySelector('.bmOptions').classList.toggle('hidden');
    }
  });
};

function closeAllCarets() {
  for (i = 0; i < bmLIs.length; i++) {
    allCarets[i].classList.remove('pulldown');
    bmLIs[i].querySelector('.bm-row').classList.remove("box");
    bmLIs[i].querySelector('.bmOptions').classList.add('hidden')
  };
};

for(i = 0; i < editButtons.length; i++) {
  const editButton = editButtons[i];
  editButtons[i].addEventListener('click', (e) => {
    e.preventDefault();
    
    console.log(editButton);
    console.log(editButton.text);
  });
};
