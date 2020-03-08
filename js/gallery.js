'use strict';

(function () {
  var messageTemplate = window.loadMessage.messageTemplate;

  var pictures = document.querySelector('.pictures');
  var uploadFileInput = pictures.querySelector('#upload-file');

  var photos = [];

  var onBackendLoad = function (photosArray) {
    photos = photosArray;
    window.gallery = photos;
    window.preview(photos);
    window.photoFilters();
  };

  var onBackendError = function (errorMessage) {
    window.loadMessage.create(messageTemplate.loadError, errorMessage, 'Продолжить');
  };

  window.backend.load(onBackendLoad, onBackendError);

  uploadFileInput.addEventListener('change', function () {
    window.uploadForm();
  });


  window.gallery = photos;
})();

