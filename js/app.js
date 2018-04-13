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
const bmLIs = $('#bmList li')
// Add Bookmark link
const bmAddLink = $('#bmAddLink')[0];
// 
const bmInsert = $('#bmInsert')[0];

bmAddLink.addEventListener('click', () => {
  bmInsert.classList.toggle('hidden');
});

/**********/
/* EVENTS */
/**********/
// Adds click listener to all bookmark links
for (i = 0; i < bmLink.length; i++) {
  bmLink[i].addEventListener('click', () => {
    // Reloads when link is loaded
   setTimeout(function () {
     window.location.reload(true);
   }, 1000);
   
  })
};

// Adds click listener to bookmark menu arrow (caret)
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

/*************/
/* FUNCTIONS */
/*************/
// Menu with bookmark edit options
function createEditForm(id, selector) {
  // Creating form data for editing chosen bookmark
  form = document.createElement("div");
  form.classList.add("theform");
  // The HTML code inserted
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
      <div class="col-3 form-group">
        <button class="btn btn-sm btn-warning" name="edit" type="submit">
          Update
        </button>
      </div>
      <div class="col-9 form-group text-right">
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

// Close the bookmark edit options
// Deletes the entire edit form when unselecting bookmark
function deleteEditForm(selector) {
  selector.querySelector('.bmOptions').removeChild(form);
}


// Closes/unselects all carets
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

// Filter table
function filterTable() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById('bmSearch');
  filter = input.value.toUpperCase();
  ul = document.getElementById("bmList");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}