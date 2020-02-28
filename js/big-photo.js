'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');

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

  window.bigPhoto = renderBigPhoto;
})();
