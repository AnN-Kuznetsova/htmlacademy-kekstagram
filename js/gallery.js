'use strict';

(function () {
  var messageTemplate = window.loadMessage.messageTemplate;

  var pictures = document.querySelector('.pictures');
  var uploadFileInput = pictures.querySelector('#upload-file');

  var photos;

  var onBackendLoad = function (photosArray) {
    photos = photosArray;
    pictures.appendChild(window.preview(photos));
    window.filters();
  };

  var onBackendError = function (errorMessage) {
    window.loadMessage.create(messageTemplate.loadError, errorMessage, 'Продолжить');
  };

  var onPicturesClick = function (evt) {
    window.picture(evt.target.parentNode, photos);
  };

  var onPicturesKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.picture(evt.target, photos);
    });
  };

  window.backend.load(onBackendLoad, onBackendError);

  pictures.addEventListener('click', onPicturesClick);
  pictures.addEventListener('keydown', onPicturesKeydown);

  uploadFileInput.addEventListener('change', function () {
    window.uploadForm();
  });

})();

