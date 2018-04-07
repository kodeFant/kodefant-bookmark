/************/
/* bling.js */
/************/
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
/*************/
/* Variables */
/*************/
// Selects all bookmark links
const bmLink = $('.bmLink');
//Selects all carets
const allCarets = $('.caret');
// Select url input
const urlInput = $('#url')[0];
// Select bookmark title  input
const bmTitleInput = $('#name')[0];
// Select UL
const bmUL = $('#bmList')[0];
// Select all list items
const bmLIs = $('li');

// Adds click listener to all bookmark links
for (i = 0; i < bmLink.length; i++) {
  bmLink[i].addEventListener('click', () => {
    // Reloads when link is loaded
    window.location.reload(true);
  })
};

// Menu with link edit options
function createEditForm(id, selector) {
  form = document.createElement("div");
  form.classList.add("theform");
  // Cloning, deleting and readding name
/*     link = selector.querySelector('.bmLink');
    linkClone = selector.querySelector('.bmLink').cloneNode(true);
    link.innerHTML = `<div class="input-group">
  <span class="input-group-addon" id="sizing-addon2"><img src="http://www.google.com/s2/favicons?domain_url=${bmtoPHP[id].id}%2F" alt=""></span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2">
</div>`;
    link.appendChild(linkClone); */

  form.innerHTML =
    `<input type="hidden" name="id" value="${bmtoPHP[id].id}">
    <div class="form-group">
      <label for="editName">Title:</label>
      <input class="form-control" name="editName" value="${bmtoPHP[id].name}" type="text">
    </div>
    <div class="form-group">
      <label for="editURL">URL:</label>
      <input class="form-control" type="text" name="editURL" value="${bmtoPHP[id].url}" >
    </div>
    <div class="row">
      <div class="col-4 form-group">
        <button class="btn btn-sm btn-warning" name="edit" type="submit">
          Update
        </button>
      </div>
      <div class="col-8 form-group text-right">
          <a class="btn btn-info btn-sm" href="?reset&id=${bmtoPHP[id].id}">
            Reset count (${bmtoPHP[id].count})
          </a>
          <a class="deleteButton btn btn-sm btn-danger" href="?delete&id=${bmtoPHP[id].id}">
            Delete
          </a>
        </div>
      </div>
    </div>`;

  const appendOptions = selector.querySelector('.bmOptions').appendChild(form);
}

function deleteEditForm(selector) {
  let inputs = selector.querySelector('.bmOptions').removeChild(form);
}

for (i = 0; i < allCarets.length; i++) {
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
    if (bmLIs[i].querySelector('.theform') !== null) {
      deleteEditForm(bmLIs[i])
    };
    allCarets[i].classList.remove('pulldown');
    bmLIs[i].querySelector('.bm-row').classList.remove("box");
    bmLIs[i].querySelector('.bmOptions').classList.add('hidden');
    allCarets[i].classList.remove('active');

  };
};
