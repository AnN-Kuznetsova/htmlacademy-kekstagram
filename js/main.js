'use strict';
var ESC_KEY = 'Escape';

var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MAX_COMMENTS = 5;
var DESCRIPTIONS = [
  'Выразительный JavaScript: Document Object Model.',
  'Выразительный JavaScript: Формы и поля форм',
  'Выразительный JavaScript: Структуры данных: объекты и массивы'
];
var COMMENTS_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var body = document.querySelector('body');

var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureDescription = bigPicture.querySelector('.social__caption');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureSocialComments = bigPicture.querySelector('.social__comments');

/* var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader'); */

var photoTemplate = document.querySelector('#picture').content;
var socialCommentTemplate = document.querySelector('#social-comment').content;

//  Функция нахождения случайного числа
var randomNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция выбора случачйного элемента массива
var getRandomArrayElement = function (array) {
  return array[randomNumber(array.length - 1)];
};

//  Функция создания массива комментариев
var commentsCreate = function (commentsCount) {
  var commentsArray = [];
  for (var i = 0; i < commentsCount; i++) {
    commentsArray[i] = {};
    commentsArray[i].avatar = 'img/avatar-' + (randomNumber(5) + 1) + '.svg';
    commentsArray[i].message = getRandomArrayElement(COMMENTS_TEXTS);
    commentsArray[i].name = getRandomArrayElement(AUTHORS_NAMES);
  }
  return commentsArray;
};

//  Функция создания массива фотографий
var photosCreate = function (photosCount) {
  var photosArray = [];
  for (var i = 0; i < photosCount; i++) {
    photosArray[i] = {};
    photosArray[i].url = 'photos/' + (i + 1) + '.jpg';
    photosArray[i].description = getRandomArrayElement(DESCRIPTIONS);
    photosArray[i].likes = randomNumber(MAX_LIKES - MIN_LIKES) + MIN_LIKES;
    photosArray[i].comments = commentsCreate(randomNumber(MAX_COMMENTS));
  }
  return photosArray;
};

//  Функция отрисовки фотографии
var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};

//  Функция отрисовки всех фотографий
var renderPhotos = function (photosArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    fragment.appendChild(renderPhoto(photosArray[i]));
  }
  return fragment;
};

var photos = photosCreate(PHOTOS_COUNT);
pictures.appendChild(renderPhotos(photos));


/*  Большая фотография  */

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
  bigPictureLikesCount.textContent = bigPhoto.likes;
  bigPictureCommentsCount.textContent = bigPhoto.comments.length;
  bigPictureDescription.textContent = bigPhoto.description;
  bigPictureSocialComments.innerHTML = '';
  bigPictureSocialComments.appendChild(renderSocialComments(bigPhoto.comments));
};

renderBigPhoto(photos[0]);

/* body.classList.add('modal-open');
bigPictureSocialCommentCount.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');
bigPicture.classList.remove('hidden'); */


/*  Загрузка изображения  */

var imgUpload = pictures.querySelector('.img-upload'); //  Поле для загрузки нового изображения на сайт
var uploadFileInput = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay'); //  Форма редактирования изображения
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

//  Функция закрытия попапа по нажатию на ESC
var onPopupEscPress = function (evt, target, closePopup) {
  if (evt.key === ESC_KEY) {
    if (((target.tagName === 'INPUT') && (target.type === 'text')) || (target.tagName === 'TEXTAREA')) {
      target.blur();
    } else {
      closePopup();
    }
  }
};

//  mountedImgUploadOverlay() - всё добавляет
var mountedImgUploadOverlay = function () {
  uploadCancel.addEventListener('click', closeImgUploadOverlay);
  document.addEventListener('keydown', onImgUploadOverlayEscPress);
};

//  destroyedImgUploadOverlay() - всё удаляет
var destroyedImgUploadOverlay = function () {
  document.removeEventListener('keydown', onImgUploadOverlayEscPress);
};

var closeImgUploadOverlay = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  destroyedImgUploadOverlay();
};

var onImgUploadOverlayEscPress = function (evt) {
  onPopupEscPress(evt, evt.target, closeImgUploadOverlay);
};

var openImgUploadOverlay = function () {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  mountedImgUploadOverlay();
};

uploadFileInput.addEventListener('change', function () {
  openImgUploadOverlay();
});
