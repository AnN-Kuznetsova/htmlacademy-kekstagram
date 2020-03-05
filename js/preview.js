'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');

  var renderPhotos = [];


  var renderPreviewPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };

  var renderGallery = function (photosArray) {
    renderPhotos = photosArray;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < renderPhotos.length; i++) {
      fragment.appendChild(renderPreviewPhoto(renderPhotos[i]));
    }

    while (pictures.querySelectorAll('.picture').length > 0) {
      pictures.removeChild(pictures.querySelector('.picture'));
    }
    pictures.appendChild(fragment);

    pictures.addEventListener('click', onPicturesClick);
    pictures.addEventListener('keydown', onPicturesKeydown);
  };

  var onPicturesClick = function (evt) {
    window.picture(evt.target.parentNode, renderPhotos);
  };

  var onPicturesKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.picture(evt.target, renderPhotos);
    });
  };


  window.preview = renderGallery;
})();
