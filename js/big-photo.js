'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');

  //  Функция отрисовки большой фотографии
  var renderBigPhoto = function (bigPhoto) {
    bigPictureImg.src = bigPhoto.url;
    bigPictureImg.alt = bigPhoto.description;
    bigPictureLikesCount.textContent = bigPhoto.likes;
    bigPictureDescription.textContent = bigPhoto.description;
    window.comments(bigPhoto.comments);
  };

  window.bigPhoto = renderBigPhoto;
})();
