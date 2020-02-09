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

  scaleControlSmaller.addEventListener('click', setScaleValue);
  scaleControlBigger.addEventListener('click', setScaleValue);

  for (var i = 0; i < effectsRradioButtons.length; i++) {
    effectsRradioButtons[i].addEventListener('change', function (evt) {
      setEffect(evt);
    });
  }

  effectLevelPin.addEventListener('mousedown', onSliderPinMouseDown);
};

//  destroyedImgUploadOverlay() - всё удаляет
var destroyedImgUploadOverlay = function () {
  document.removeEventListener('keydown', onImgUploadOverlayEscPress);
};

//  Сброс параметров окна редактирования изображени в начальные установки
var resetImgUploadOverlay = function () {
  uploadFileInput.value = '';
  renderScale(DEFAULT_SCALE);
  resetEffect();
};

var closeImgUploadOverlay = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  // resetImgUploadOverlay();
  destroyedImgUploadOverlay();
};

var onImgUploadOverlayEscPress = function (evt) {
  onPopupEscPress(evt, evt.target, closeImgUploadOverlay);
};

var openImgUploadOverlay = function () {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  mountedImgUploadOverlay();
  resetImgUploadOverlay();
};

uploadFileInput.addEventListener('change', function () {
  openImgUploadOverlay();
});


/*  Изменение размера изображения  */

var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var DEFAULT_SCALE = 100;

var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

//  Функция изменения масштаба
var setScaleValue = function (evt) {
  var scaleValue = parseInt(scaleControlValue.value.slice(0, (scaleControlValue.value.length - 1)), 10);
  if ((evt.target === scaleControlSmaller) && (scaleValue > MIN_SCALE)) {
    scaleValue -= SCALE_STEP;
  } else if ((evt.target === scaleControlBigger) && (scaleValue < MAX_SCALE)) {
    scaleValue += SCALE_STEP;
  }

  renderScale(scaleValue);
  // return scaleValue;
};

var renderScale = function (scale) {
  scaleControlValue.value = scale + '%';
  scale = (scale / 100);
  imgUploadPreview.style.transform = 'scale(' + scale + ')';
};


/*  Наложение эффекта на изображение  */

var effectLevel = imgUploadOverlay.querySelector('.effect-level');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

var DEFAULT_EFFECT_NAME = 'effects__preview--none';
var DEFAULT_EFFECT_VALUE = effectLevelValueInput.value;

var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');

var filterEffect = {
  setDefaultValues: function () {
    this.name = DEFAULT_EFFECT_NAME;
    this.value = DEFAULT_EFFECT_VALUE;
  }
};

filterEffect.setDefaultValues();

var getEffectName = function (effectTartget) {
  return ('effects__preview--' + effectTartget.id.slice(7));
};

var removeEffect = function () {
  if (filterEffect.name) {
    imgUploadPreview.classList.remove(filterEffect.name);
  }
};

var addEffect = function (effectName) {
  if (effectName !== 'effects__preview--none') {
    imgUploadPreview.classList.add(effectName);
    filterEffect.name = effectName;
  }
};

var resetEffect = function () {
  removeEffect();
  for (var i = 0; i < effectsRradioButtons.length; i++) {
    if (getEffectName(effectsRradioButtons[i]) === DEFAULT_EFFECT_NAME) {
      effectsRradioButtons[i].checked = true;
      addEffect(getEffectName(effectsRradioButtons[i]));
    }
  }
  initSlider(DEFAULT_EFFECT_NAME);
};

var setEffect = function (evt) {
  removeEffect();
  addEffect(getEffectName(evt.target));
  initSlider(getEffectName(evt.target));
};


/*  Слайдер  */

var onSliderPinMouseDown = function (evt) {
  var line = effectLevelLine.getBoundingClientRect();
  var evtXStart = evt.clientX;

  var onSliderPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var pinOffsetLeft;
    var shiftX = (evtXStart - moveEvt.clientX);
    evtXStart = moveEvt.clientX;

    if ((effectLevelPin.offsetLeft - shiftX) < 0) {
      pinOffsetLeft = 0;
      evtXStart = line.x;
    } else if ((effectLevelPin.offsetLeft - shiftX) > line.width) {
      pinOffsetLeft = line.width;
      evtXStart = line.x + line.width;
    } else {
      pinOffsetLeft = effectLevelPin.offsetLeft - shiftX;
    }

    filterEffect.value = calculateEffectValue(effectLevelLine, effectLevelPin);
    effectLevelValueInput.value = filterEffect.value;
    renderSlider(pinOffsetLeft, filterEffect.value);
    renderEffect(filterEffect.name, filterEffect.value);
  };

  var onSliderPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onSliderPinMouseMove);
    document.removeEventListener('mouseup', onSliderPinMouseUp);
  };

  document.addEventListener('mousemove', onSliderPinMouseMove);
  document.addEventListener('mouseup', onSliderPinMouseUp);
};

var calculateEffectValue = function (sliderLine, sliderPin) {
  var line = sliderLine.getBoundingClientRect();
  var pin = sliderPin.getBoundingClientRect();
  return ((pin.x - line.x) * 100 / line.width);
};

var calculatePinOffset = function (sliderLine, effectValue) {
  var line = sliderLine.getBoundingClientRect();
  return (line.width * effectValue / 100);
};

var renderSlider = function (pinOffset, effectValue) {
  effectLevelDepth.style.width = effectValue + '%';
  effectLevelPin.style.left = pinOffset + 'px';
};

var renderEffect = function (effectName, effectValue) {


  window.console.log(effectName + ', ' + effectValue);
};

var initSlider = function (effectName) {
  filterEffect.setDefaultValues();
  filterEffect.name = effectName;
  effectLevelValueInput.value = DEFAULT_EFFECT_VALUE;
  if (filterEffect.name === 'effects__preview--none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    renderSlider(calculatePinOffset(effectLevelLine, filterEffect.value), filterEffect.value);
  }
};
