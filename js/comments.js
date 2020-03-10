'use strict';

(function () {
  var MAX_COMMENTS_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');

  var socialCommentTemplate = document.querySelector('#social-comment').content;

  var comments = [];


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
    commentsArray.forEach(function (comment) {
      fragment.appendChild(renderSocialComment(comment));
    });
    bigPictureSocialComments.innerHTML = '';
    bigPictureSocialComments.appendChild(fragment);
  };

  var showCommentsControllers = function () {
    bigPictureSocialCommentCount.classList.remove('hidden');
    bigPictureCommentsLoader.classList.remove('hidden');
  };

  var hideCommentsControllers = function () {
    bigPictureSocialCommentCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
  };

  var setComments = function (commentsArray) {
    comments = commentsArray.slice();
    bigPictureCommentsCount.textContent = comments.length;
    addComments(comments);
  };

  var addComments = function (commentsArray) {
    if (commentsArray.length <= MAX_COMMENTS_COUNT) {
      bigPictureCommentsLoader.removeEventListener('click', onBigPictureCommentsLoaderClick);
      hideCommentsControllers();
      renderSocialComments(commentsArray);
    } else {
      showCommentsControllers();
      bigPictureCommentsLoader.addEventListener('click', onBigPictureCommentsLoaderClick);
      renderSocialComments(commentsArray.splice(0, MAX_COMMENTS_COUNT));
    }
  };

  var onBigPictureCommentsLoaderClick = function () {
    addComments(comments);
  };


  window.comments = setComments;
})();
