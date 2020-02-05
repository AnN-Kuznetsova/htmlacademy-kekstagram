'use strict';
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

var pictures = document.querySelector('.pictures');

//  Шаблон фотографии
var photoTemplate = document.querySelector('#picture').content;

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
