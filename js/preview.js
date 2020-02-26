'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content;

  var renderPreviewPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };

  //  Функция отрисовки всех фотографий
  var renderGallery = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(renderPreviewPhoto(photosArray[i]));
    }
    return fragment;
  };

  window.preview = renderGallery;
})();
