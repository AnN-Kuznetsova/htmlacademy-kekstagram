'use strict';

(function () {
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


  //  Функция создания массива комментариев
  var commentsCreate = function (commentsCount) {
    var commentsArray = [];
    for (var i = 0; i < commentsCount; i++) {
      commentsArray.push({
        avatar: 'img/avatar-' + (window.random.number(5) + 1) + '.svg',
        message: window.random.arrayElement(COMMENTS_TEXTS),
        name: window.random.arrayElement(AUTHORS_NAMES)
      });
    }
    return commentsArray;
  };

  //  Функция создания массива фотографий
  var photosCreate = function (photosCount) {
    var photosArray = [];
    for (var i = 0; i < photosCount; i++) {
      photosArray.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: window.random.arrayElement(DESCRIPTIONS),
        likes: window.random.number(MAX_LIKES - MIN_LIKES) + MIN_LIKES,
        comments: commentsCreate(window.random.number(MAX_COMMENTS))
      });
    }
    return photosArray;
  };

  var photos = photosCreate(PHOTOS_COUNT);

  window.data = photos;

})();
