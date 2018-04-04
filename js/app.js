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
const urlInput = $('#url')[0];
// Select bookmark title  input
const bmTitleInput = $('#name')[0];
// Select Edit buttons
const editButtons = $('.editButton');
// Select UL
const bmUL = $('#bmList')[0];
// Select all list items
const bmLIs = $('li');
//

// Adds click listener to all bookmark links
for (i = 0; i < bmLink.length; i++){
bmLink[i].addEventListener('click', () => {
  // Reloads when link is loaded
  window.location.reload(true);
  })
};

function createEditForm (id, selector) {
  form = document.createElement("form");
  form.classList.add("form-group");
  form.innerHTML = `<input type="hidden" name="id" value="${bmtoPHP[id].id}"><input class="form-control" name="editName" value="${bmtoPHP[id].name}" type="text"><input class="form-control" type="text" name="editURL" value="${bmtoPHP[id].url}" ><button class="btn btn-warning" name="edit" type="submit">Update</button>`;
  let inputs = selector.querySelector('.bmOptions').appendChild(form);
}

function deleteEditForm(selector) {
  let inputs = selector.querySelector('.bmOptions').removeChild(form);
}

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
    createEditForm(bmID, parentLI);
    }
  });
};

function closeAllCarets() {
  for (i = 0; i < bmLIs.length; i++) {
    if (bmLIs[i].querySelector('form') !== null) {
      deleteEditForm(bmLIs[i])
    };
    allCarets[i].classList.remove('pulldown');
    bmLIs[i].querySelector('.bm-row').classList.remove("box");
    bmLIs[i].querySelector('.bmOptions').classList.add('hidden');
    allCarets[i].classList.remove('active');

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
