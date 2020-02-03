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

//  Массив фотографий
var photos = photosCreate(PHOTOS_COUNT);
window.console.log(photos);


/*
'use strict';

var SIMILAR_WIZADRS_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup'); // Окно настройки персонажа
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список похожих персонажей

//  Шаблон похожего персонажа
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

//  Функция нахождения случайного числа
var randomNamber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция создания массива волшебников
var wizardsCreate = function (wizardsCount) {
  var wizardsArray = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizardsArray[i] = {};
    wizardsArray[i].name = WIZARD_FIRST_NAMES[randomNamber(WIZARD_FIRST_NAMES.length - 1)] + ' ' + WIZARD_SECOND_NAMES[randomNamber(WIZARD_SECOND_NAMES.length - 1)];
    wizardsArray[i].coatColor = WIZARD_COAT_COLORS[randomNamber(WIZARD_COAT_COLORS.length - 1)];
    wizardsArray[i].eyesColor = WIZARD_EYES_COLORS[randomNamber(WIZARD_EYES_COLORS.length - 1)];
  }
  return wizardsArray;
};

//  Массив волшебников
var wizards = wizardsCreate(SIMILAR_WIZADRS_COUNT);

//  Функция отрисовки волшебника
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

//  Создание похожих персонажй
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden'); // Показ блока "Похожие персонажи"

*/
