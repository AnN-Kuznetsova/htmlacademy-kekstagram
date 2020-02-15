'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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
var footer = document.querySelector('footer');

var imgFilters = document.querySelector('.img-filters');

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

//  Объект контроля фокуса между окнами
var windowFocus = {
  FOCUS_REMOVE_INDEX: '-1',
  FOCUS_ADD_INDEX: '0',

  focusOut: function (focusElement) {
    this.changeFocus(this.FOCUS_REMOVE_INDEX);
    this.currentElement = focusElement;
  },

  focusIn: function () {
    windowFocus.changeFocus(this.FOCUS_ADD_INDEX);
    windowFocus.replaceCurrentElement();
  },

  replaceCurrentElement: function () {
    this.currentElement.focus();
  },

  changeFocus: function (tabindex) {
    var tabIndexChange = function (elementsArray) {
      for (var i = 0; i < elementsArray.length; i++) {
        elementsArray[i].tabIndex = tabindex;
      }
    };

    tabIndexChange(pictures.querySelectorAll('.picture'));
    tabIndexChange(footer.querySelectorAll('a'));
    tabIndexChange(imgFilters.querySelectorAll('button'));
  }
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
  bigPictureCancel.addEventListener('click', closeBigPicture);
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
  windowFocus.focusIn();
};

var onBigPictureEscPress = function (evt) {
  onPopupEscPress(evt, evt.target, closeBigPicture);
};

// var onSmallPictureClick = function (clickedPicture) {
var openBigPicture = function (clickedPicture) {
  var photoObject = getPhotoObject(clickedPicture, photos);
  if (photoObject) {
    renderBigPhoto(photoObject);
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    mountedBigPicture();
    windowFocus.focusOut(clickedPicture);

    bigPictureSocialCommentCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
  }
};


var photos = photosCreate(PHOTOS_COUNT);
pictures.appendChild(renderPhotos(photos));

pictures.addEventListener('click', function (evt) {
  openBigPicture(evt.target.parentNode);
});

pictures.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openBigPicture(evt.target);
  }
});

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
  effectLevelLine.addEventListener('click', onEffectLevelLineClick);
  imgUploadForm.addEventListener('submit', onFormSubmit);
  textHashtagsInput.addEventListener('input', onTextHashtagsInput);
  textDescriptionInput.addEventListener('input', onTextDescriptionInput);
  uploadFileInput.addEventListener('change', uploadFileTypeValidation);   /////////////////////////////////////////////
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
  textHashtagsInput.value = '';
  textHashtagsInputValidation();
};

var closeImgUploadOverlay = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetImgUploadOverlay();
  destroyedImgUploadOverlay();
  windowFocus.focusIn();
};

var onImgUploadOverlayEscPress = function (evt) {
  onPopupEscPress(evt, evt.target, closeImgUploadOverlay);
};

var openImgUploadOverlay = function () {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  mountedImgUploadOverlay();
  windowFocus.focusOut(imgUpload.querySelector('.img-upload__label'));
  resetEffect();
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
var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');

var DEFAULT_EFFECT_NAME = 'effect-none'; // 'effects__preview--none';
var DEFAULT_EFFECT_VALUE = 100; // effectLevelValueInput.value;
var NONE_EFFECT_NAME = 'effect-none';

var filters = {
  'effect-none': {
    className: 'effects__preview--none',
    lawСreation: function (effectValue) {
      effectValue = '';
      return effectValue;
    }
  },
  'effect-chrome': {
    className: 'effects__preview--chrome',
    lawСreation: function (effectValue) {
      return 'grayscale(' + (effectValue / 100) + ')';
    }
  },
  'effect-sepia': {
    className: 'effects__preview--sepia',
    lawСreation: function (effectValue) {
      return 'sepia(' + (effectValue / 100) + ')';
    }
  },
  'effect-marvin': {
    className: 'effects__preview--marvin',
    lawСreation: function (effectValue) {
      return 'invert(' + effectValue + '%)';
    }
  },
  'effect-phobos': {
    className: 'effects__preview--phobos',
    lawСreation: function (effectValue) {
      return 'blur(' + (effectValue * 3 / 100) + 'px)';
    }
  },
  'effect-heat': {
    className: 'effects__preview--heat',
    lawСreation: function (effectValue) {
      return 'brightness(' + (effectValue * 2 / 100 + 1) + ')';
    }
  }
};

var filterEffect = (function () {
  var effectObject = {};
  effectObject.name = DEFAULT_EFFECT_NAME;
  effectObject.value = DEFAULT_EFFECT_VALUE;
  effectObject.class = filters[effectObject.name].className;
  return effectObject;
})();

var removeEffect = function () {
  if (filterEffect.class) {
    imgUploadPreview.classList.remove(filterEffect.class);
  }
};

var addEffect = function (effectName) {
  filterEffect.name = effectName;
  filterEffect.class = filters[effectName].className;
  filterEffect.value = DEFAULT_EFFECT_VALUE;
  effectLevelValueInput.value = filterEffect.value;
  imgUploadPreview.classList.add(filterEffect.class);
};

var resetEffect = function () {
  removeEffect();
  for (var i = 0; i < effectsRradioButtons.length; i++) {
    if (effectsRradioButtons[i].id === DEFAULT_EFFECT_NAME) {
      effectsRradioButtons[i].checked = true;
      addEffect(effectsRradioButtons[i].id);
    }
  }
  initSlider();
};

var setEffect = function (evt) {
  removeEffect();
  addEffect(evt.target.id);
  initSlider();
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
    renderSlider(pinOffsetLeft, filterEffect.value);
    renderEffect(filterEffect.name, filterEffect.value);
  };

  var onSliderPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    effectLevelValueInput.value = filterEffect.value;

    document.removeEventListener('mousemove', onSliderPinMouseMove);
    document.removeEventListener('mouseup', onSliderPinMouseUp);
  };

  document.addEventListener('mousemove', onSliderPinMouseMove);
  document.addEventListener('mouseup', onSliderPinMouseUp);
};

var onEffectLevelLineClick = function (evt) {
  var pinOffsetLeft = evt.clientX - effectLevelLine.getBoundingClientRect().x;
  renderSlider(pinOffsetLeft, filterEffect.value);
  filterEffect.value = calculateEffectValue(effectLevelLine, effectLevelPin);
  effectLevelValueInput.value = filterEffect.value;
  renderEffect(filterEffect.name, filterEffect.value);
  renderSlider(pinOffsetLeft, filterEffect.value);
};

var calculateEffectValue = function (sliderLine, sliderPin) {
  var line = sliderLine.getBoundingClientRect();
  var pin = sliderPin.getBoundingClientRect();
  return Math.round((pin.x + (pin.width / 2) - line.x) * 100 / line.width);
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
  imgUploadPreview.style.filter = filters[effectName].lawСreation(effectValue);
};

var initSlider = function () {
  if (filterEffect.name === NONE_EFFECT_NAME) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    renderSlider(calculatePinOffset(effectLevelLine, filterEffect.value), filterEffect.value);
  }
  renderEffect(filterEffect.name, filterEffect.value);
};


/*  Валидация формы загрузки нового изображения  */
var imgUploadForm = pictures.querySelector('.img-upload__form');
var textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
var textDescriptionInput = imgUploadForm.querySelector('.text__description');

var onFormSubmit = function (evt) {
  evt.preventDefault();
  if (uploadFileTypeValidation() && textHashtagsInputValidation() && textDescriptionInputValidation()) {
    evt.target.submit();
    closeImgUploadOverlay();
  }
};

//  Валидация хеш-тегов
var hashtagsSpecification = (function () {
  var maxCount = 5;
  var hashtagsSeparator = ' ';
  var hashtagsMinLength = 2;
  var hashtagsMaxLength = 20;
  var hashtagsDescription = /(^#[A-Za-zА-Яа-я0-9]+$){1}/;

  var hashtagsValiditiesErrors = {
    isHashtagsCount: {
      isValid: true,
      message: 'Число хэш-тегов не должно быть больше ' + maxCount + '-ти.'
    },
    isMinLength: {
      isValid: true,
      message: 'Длина хэш-тега не должна быть меньше ' + hashtagsMinLength + '-х символов.'
    },
    isMaxLength: {
      isValid: true,
      message: 'Длина хэш-тега не должна быть больше ' + hashtagsMaxLength + '-ти символов.'
    },
    isPatternValid: {
      isValid: true,
      message: 'Хэш-тег должен начинаться с "#" и содержать только буквы и цифры. \nХэш-теги разделяются пробелами.'
    },
    isElementDuplicate: {
      isValid: true,
      message: 'Хэш-теги не могут дублироваться (регистр ввода не учитывается).'
    }
  };

  var specification = {
    maxHashtagsCount: maxCount,
    separator: hashtagsSeparator,
    minLength: hashtagsMinLength,
    maxLength: hashtagsMaxLength,
    description: hashtagsDescription,
    validitiesErrors: hashtagsValiditiesErrors
  };
  return specification;
})();

var onTextHashtagsInput = function () {
  textHashtagsInputValidation();
};

var textHashtagsInputValidation = function () {
  var hashtags = [];

  if (textHashtagsInput.value) {
    hashtags = textHashtagsInput.value.toLowerCase().split(hashtagsSpecification.separator);
    if (hashtags.length) {
      for (var i = (hashtags.length - 1); i >= 0; i--) {
        if (!hashtags[i]) {
          hashtags.splice(i, 1);
        }
      }
    }
  }

  var validityResalt = getValidation(hashtagsSpecification, 'hashtags', hashtags);
  textHashtagsInput.setCustomValidity(validityResalt.message);
  return validityResalt.resalt;
};

//  Валидация комментария (описания) для формы загрузки нового изображения
var textDescriptionSpecification = (function () {
  var textMinLength = textDescriptionInput.getAttribute('minlength');
  var textMaxLength = textDescriptionInput.getAttribute('maxlength');

  var textValiditiesErrors = {
    isMaxLength: {
      isValid: true,
      message: 'Длина комментария не должна быть больше ' + textMaxLength + ' символов.'
    }
  };

  var specification = {
    minLength: textMinLength,
    maxLength: textMaxLength,
    validitiesErrors: textValiditiesErrors
  };
  return specification;
})();

var onTextDescriptionInput = function () {
  textDescriptionInputValidation();
};

var textDescriptionInputValidation = function () {
  var validityResalt = getValidation(textDescriptionSpecification, 'descriptionInput', textDescriptionInput.value);
  textDescriptionInput.setCustomValidity(validityResalt.message);
  return validityResalt.resalt;
};

//  Валидация типа загружаемого файла
var uploadFileTypeValidation = function () {
  var isValidity = true;
  var pattern = /(.png$){1}|(.jpg$){1}|(.jpeg$){1}/;

  if (!isPattern(uploadFileInput.value.toLowerCase(), pattern)) {
    isValidity = false;
    uploadFileInput.setCustomValidity('Выберите правильный формат файла для загрузки: .png, .jpg, .jpeg');
  } else {
    uploadFileInput.setCustomValidity('');
  }

  return isValidity;
};


var getValidation = function (specification) {
  var errorsArray = specification.validitiesErrors;
  var isValidity = true;
  var validityMessage = '';

  var hashtags = (arguments[1] === 'hashtags') ? arguments[2] : [];
  var textDescription = (arguments[1] === 'descriptionInput') ? arguments[2] : '';


  for (var errorElement in errorsArray) {
    if (!errorsArray[errorElement].isValid) {
      errorsArray[errorElement].isValid = true;
    }
  }

  //  Хэш-теги
  if (hashtags.length) {
    if (!isArrayLength(hashtags, specification.maxHashtagsCount)) {
      errorsArray.isHashtagsCount.isValid = false;
    }

    hashtags.forEach(function (element) {
      if (!isMoreMinLength(element, specification.minLength) && errorsArray.isMinLength.isValid) {
        errorsArray.isMinLength.isValid = false;
      }
      if (!isLessMaxLength(element, specification.maxLength) && errorsArray.isMaxLength.isValid) {
        errorsArray.isMaxLength.isValid = false;
      }
      if (!isPattern(element, specification.description) && errorsArray.isPatternValid.isValid) {
        errorsArray.isPatternValid.isValid = false;
      }
    });

    if (!hashtags.every(isArrayElementDuplicate)) {
      errorsArray.isElementDuplicate.isValid = false;
    }
  }

  //  Поле ввода комментария (описания) формы редактирования изображения
  if (textDescription) {
    if (!isLessMaxLength(textDescription, specification.maxLength) && errorsArray.isMaxLength.isValid) {
      errorsArray.isMaxLength.isValid = false;
    }
  }


  for (var error in errorsArray) {
    if (!errorsArray[error].isValid) {
      isValidity = false;
      validityMessage += errorsArray[error].message + ' \r\n ';
    }
  }

  return {
    resalt: isValidity,
    message: validityMessage
  };
};

var isArrayLength = function (array, maxLength) {
  return (array.length > maxLength) ? false : true;
};

var isMoreMinLength = function (str, minLength) {
  return (str.length >= minLength);
};

var isLessMaxLength = function (str, maxLength) {
  return (str.length <= maxLength);
};

var isPattern = function (str, pattern) {
  return RegExp(pattern).test(str);
};

var isArrayElementDuplicate = function (element, index, array) {
  return !(array.includes(element, (index + 1)));
};
