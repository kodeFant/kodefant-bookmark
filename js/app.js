const bmLink = document.querySelectorAll('.bmLink');

for (i = 0; i < bmLink.length; i++){
bmLink[i].addEventListener('click', () => {
  window.location.reload(true);
  })
};
