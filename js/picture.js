'use strict';

(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  //  Функция нахождения объекта фотографии
  var getPhotoObject = function (clickedPicture, photosArray) {
    var picturesArray = pictures.querySelectorAll('.picture');
    var index = Array.prototype.indexOf.call(picturesArray, clickedPicture);
    var photoObj = (index >= 0) ? photosArray[index] : '';
    return photoObj;
  };

  //  mountedBigPicture() - всё добавляет
  var mountedBigPicture = function () {
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  //  destroyedBigPicture() - всё удаляет
  var destroyedBigPicture = function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    destroyedBigPicture();
    window.windowFocus.focusIn();
  };

  var onBigPictureCancelClick = function () {
    closeBigPicture();
  };

  var onBigPictureEscPress = function (evt) {
    window.util.onPopupEscPress(evt, evt.target, closeBigPicture);
  };

  var openBigPicture = function (clickedPicture, photos) {
    var photoObject = getPhotoObject(clickedPicture, photos);
    if (photoObject) {
      window.bigPhoto(photoObject);
      body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      mountedBigPicture();
      window.windowFocus.focusOut(clickedPicture);

      bigPictureSocialCommentCount.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');
    }
  };

  window.picture = openBigPicture;
})();
