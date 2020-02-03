'use strict';
var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MAX_COMMENTS = 5;
var COMMENTS_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHORS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

//  Шаблон фотографии
var photoTemplate = document.querySelector('#picture').content;

//  Функция нахождения случайного числа
var randomNamber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция создания массива комментариев
var commentsCreate = function (commentsCount) {
  var commentsArray = [];
  for (var i = 0; i < commentsCount; i++) {
    commentsArray[i] = {};
    commentsArray[i].avatar = 'img/avatar-' + (randomNamber(5) + 1) + '.svg';
    commentsArray[i].message = COMMENTS_TEXTS[randomNamber(COMMENTS_TEXTS.length - 1)];
    commentsArray[i].name = AUTHORS_NAMES[randomNamber(AUTHORS_NAMES.length - 1)];
  }
  return commentsArray;
};

//  Функция создания массива фотографий
var photosCreate = function (photosCount) {
  var photosArray = [];
  for (var i = 0; i < photosCount; i++) {
    photosArray[i] = {};
    photosArray[i].url = 'photos/' + (i + 1) + '.jpg';
    photosArray[i].description = 'Выразительный JavaScript: Document Object Model.';
    photosArray[i].likes = randomNamber(MAX_LIKES - MIN_LIKES) + MIN_LIKES;
    photosArray[i].comments = commentsCreate(randomNamber(MAX_COMMENTS));
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
document.querySelector('.pictures').appendChild(renderPhotos(photos));
