'use strict';

(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var socialCommentTemplate = document.querySelector('#social-comment').content;

  //  Функция отрисовки одного комментария
  var renderSocialComment = function (comment) {
    var commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  //  Функция отрисовки всех комментариев
  var renderSocialComments = function (commentsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsArray.length; i++) {
      fragment.appendChild(renderSocialComment(commentsArray[i]));
    }
    return fragment;
  };

  //  Функция отрисовки большой фотографии
  var renderBigPhoto = function (bigPhoto) {
    bigPictureImg.src = bigPhoto.url;
    bigPictureImg.alt = bigPhoto.description;
    bigPictureLikesCount.textContent = bigPhoto.likes;
    bigPictureCommentsCount.textContent = bigPhoto.comments.length;
    bigPictureDescription.textContent = bigPhoto.description;
    bigPictureSocialComments.innerHTML = '';
    bigPictureSocialComments.appendChild(renderSocialComments(bigPhoto.comments));
  };

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
    //window.windowFocus.focusIn();
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
      renderBigPhoto(photoObject);
      body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      mountedBigPicture();
      //window.windowFocus.focusOut(clickedPicture);

      bigPictureSocialCommentCount.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');
    }
  };

  window.picture = openBigPicture;
})();
