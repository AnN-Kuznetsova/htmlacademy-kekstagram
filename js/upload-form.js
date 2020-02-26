'use strict';

(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');

  var imgUpload = pictures.querySelector('.img-upload'); //  Поле для загрузки нового изображения на сайт
  var uploadFileInput = imgUpload.querySelector('#upload-file');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay'); //  Форма редактирования изображения
  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

  //  mountedImgUploadOverlay() - всё добавляет
  var mountedImgUploadOverlay = function () {
    uploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', onImgUploadOverlayEscPress);

    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

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
    uploadFileInput.addEventListener('change', onUploadFileInputChange);
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
    //window.windowFocus.focusIn();
  };

  var onUploadCancelClick = function () {
    closeImgUploadOverlay();
  };

  var onImgUploadOverlayEscPress = function (evt) {
    window.util.onPopupEscPress(evt, evt.target, closeImgUploadOverlay);
  };

  var openImgUploadOverlay = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    mountedImgUploadOverlay();
    //window.windowFocus.focusOut(imgUpload.querySelector('.img-upload__label'));
    resetEffect();
  };


  /*  Изменение размера изображения  */

  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var DEFAULT_SCALE = 100;

  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

  var getScaleValue = function () {
    return parseInt(scaleControlValue.value.slice(0, (scaleControlValue.value.length - 1)), 10);
  };

  var renderScale = function (scale) {
    scaleControlValue.value = scale + '%';
    scale = (scale / 100);
    imgUploadPreview.style.transform = 'scale(' + scale + ')';
  };

  var onScaleControlSmallerClick = function () {
    var scaleValue = getScaleValue();
    if (scaleValue > MIN_SCALE) {
      scaleValue -= SCALE_STEP;
    }
    renderScale(scaleValue);
  };

  var onScaleControlBiggerClick = function () {
    var scaleValue = getScaleValue();
    if (scaleValue < MAX_SCALE) {
      scaleValue += SCALE_STEP;
    }
    renderScale(scaleValue);
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

  var ValidationSpecificationName = {
    HASHTAGS: 'hashtagsSpecification',
    DESCRIPTION: 'descriptionSpecification',
    UPLOAD_FILE: 'uploadFileSpecification'
  };

  var getValidation = function (specification, validationObject) {
    var errorsArray = specification.validitiesErrors;
    var isValidity = true;
    var validityMessage = '';

    for (var errorElement in errorsArray) {
      if (!errorsArray[errorElement].isValid) {
        errorsArray[errorElement].isValid = true;
      }
    }

    switch (specification.name) {

      //  Хэш-теги
      case ValidationSpecificationName.HASHTAGS:
        var hashtags = validationObject;
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
        break;

      //  Поле ввода комментария (описания) формы редактирования изображения
      case ValidationSpecificationName.DESCRIPTION:
        var textDescription = validationObject;
        if (textDescription) {
          if (!isLessMaxLength(textDescription, specification.maxLength) && errorsArray.isMaxLength.isValid) {
            errorsArray.isMaxLength.isValid = false;
          }
        }
        break;

      //  Загружаемый файл
      case ValidationSpecificationName.UPLOAD_FILE:
        var uploadFileInputValue = validationObject;
        if (uploadFileInputValue) {
          if (!isPattern(uploadFileInputValue, specification.pattern) && errorsArray.isPatternValid.isValid) {
            errorsArray.isPatternValid.isValid = false;
          }
        }
        break;

      default:
        throw new Error('Неизвестная спецификация поля.');
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


  var onFormSubmit = function (evt) {
    evt.preventDefault();
    if (uploadFileValidation() && textHashtagsInputValidation() && textDescriptionInputValidation()) {
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
      name: ValidationSpecificationName.HASHTAGS,
      maxHashtagsCount: maxCount,
      separator: hashtagsSeparator,
      minLength: hashtagsMinLength,
      maxLength: hashtagsMaxLength,
      description: hashtagsDescription,
      validitiesErrors: hashtagsValiditiesErrors
    };
    return specification;
  })();

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

    var validityResalt = getValidation(hashtagsSpecification, hashtags);
    textHashtagsInput.setCustomValidity(validityResalt.message);
    return validityResalt.resalt;
  };

  var onTextHashtagsInput = function () {
    textHashtagsInputValidation();
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
      name: ValidationSpecificationName.DESCRIPTION,
      minLength: textMinLength,
      maxLength: textMaxLength,
      validitiesErrors: textValiditiesErrors
    };
    return specification;
  })();

  var textDescriptionInputValidation = function () {
    var validityResalt = getValidation(textDescriptionSpecification, textDescriptionInput.value);
    textDescriptionInput.setCustomValidity(validityResalt.message);
    return validityResalt.resalt;
  };

  var onTextDescriptionInput = function () {
    textDescriptionInputValidation();
  };

  //  Валидация типа загружаемого файла
  var uploadFileSpecification = (function () {
    var uploadFilePattern = /(.png$){1}|(.jpg$){1}|(.jpeg$){1}/;

    var uploadFileValiditiesErrors = {
      isPatternValid: {
        isValid: true,
        message: 'Выберите правильный формат файла для загрузки: .png, .jpg, .jpeg.'
      }
    };

    var specification = {
      name: ValidationSpecificationName.UPLOAD_FILE,
      pattern: uploadFilePattern,
      validitiesErrors: uploadFileValiditiesErrors
    };
    return specification;
  })();

  var uploadFileValidation = function () {
    var validityResalt = getValidation(uploadFileSpecification, uploadFileInput.value.toLowerCase());
    uploadFileInput.setCustomValidity(validityResalt.message);
    return validityResalt.resalt;
  };

  var onUploadFileInputChange = function () {
    uploadFileValidation();
  };


  window.uploadForm = openImgUploadOverlay;
})();
