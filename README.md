# kodefant-bookmark

A bookmarking web app

## Note to self: Script for bookmark

javascript:(function(){window.location.href = "http://localhost:8888?addBM=" + encodeURIComponent(window.location.href) + "&title=" + document.title })();