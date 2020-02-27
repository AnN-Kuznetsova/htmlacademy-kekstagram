'use strict';

(function () {
  var validationSpecificationName = window.specifications.names;
  var uploadFileSpecification = window.specifications.uploadFile;
  var hashtagsSpecification = window.specifications.hashtags;
  var textDescriptionSpecification = window.specifications.description;

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
      case validationSpecificationName.HASHTAGS:
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
      case validationSpecificationName.DESCRIPTION:
        var textDescription = validationObject;
        if (textDescription) {
          if (!isLessMaxLength(textDescription, specification.maxLength) && errorsArray.isMaxLength.isValid) {
            errorsArray.isMaxLength.isValid = false;
          }
        }
        break;

      //  Загружаемый файл
      case validationSpecificationName.UPLOAD_FILE:
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

  var setValidityResalt = function (specification, validationValue, validationField) {
    var validityResalt = getValidation(specification, validationValue);
    validationField.setCustomValidity(validityResalt.message);
    return validityResalt.resalt;
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


  //  Валидация хеш-тегов
  var textHashtagsInputValidation = function (textInput) {
    var hashtags = [];

    if (textInput.value) {
      hashtags = textInput.value.toLowerCase().split(hashtagsSpecification.separator);
      if (hashtags.length) {
        for (var i = (hashtags.length - 1); i >= 0; i--) {
          if (!hashtags[i]) {
            hashtags.splice(i, 1);
          }
        }
      }
    }

    return setValidityResalt(hashtagsSpecification, hashtags, textInput);
  };

  //  Валидация комментария (описания) для формы загрузки нового изображения
  var textDescriptionInputValidation = function (textInput) {
    return setValidityResalt(textDescriptionSpecification, textInput.value, textInput);
  };

  //  Валидация типа загружаемого файла
  var uploadFileValidation = function (uploadFileInput) {
    return setValidityResalt(uploadFileSpecification, uploadFileInput.value.toLowerCase(), uploadFileInput);
  };


  window.validation = {
    uploadFile: uploadFileValidation,
    hashtags: textHashtagsInputValidation,
    description: textDescriptionInputValidation
  };
})();
