'use strict';

(function () {
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');

  var imgUpload = pictures.querySelector('.img-upload'); //  Поле для загрузки нового изображения на сайт
  var uploadFileInput = imgUpload.querySelector('#upload-file');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay'); //  Форма редактирования изображения
  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');

  //  mountedImgUploadOverlay() - всё добавляет
  var mountedImgUploadOverlay = function () {
    uploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', onImgUploadOverlayEscPress);

    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

    for (var i = 0; i < effectsRradioButtons.length; i++) {
      effectsRradioButtons[i].addEventListener('change', function (evt) {
        window.effect.set(evt);
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
    window.scale.render(window.parameters.scale.DEFAULT);
    window.effect.reset();
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
    window.effect.reset();
  };


  var onScaleControlSmallerClick = function () {
    window.scale.decrease();
  };

  var onScaleControlBiggerClick = function () {
    window.scale.increase();
  };

  var onSliderPinMouseDown = function (evt) {
    window.slider.onPinMouseDown(evt);
  };

  var onEffectLevelLineClick = function (evt) {
    window.slider.onLineClick(evt);
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
