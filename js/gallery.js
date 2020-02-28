'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var uploadFileInput = pictures.querySelector('#upload-file');

  var photos = window.data;
  pictures.appendChild(window.preview(photos));

  var onPicturesClick = function (evt) {
    window.picture(evt.target.parentNode, photos);
  };

  var onPituresKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.picture(evt.target, photos);
    });
  };

  pictures.addEventListener('click', onPicturesClick);
  pictures.addEventListener('keydown', onPituresKeydown);

  uploadFileInput.addEventListener('change', function () {
    window.uploadForm();
  });

})();

