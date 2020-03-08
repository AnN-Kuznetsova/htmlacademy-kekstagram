'use strict';
(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var textDescriptionInput = imgUploadForm.querySelector('.text__description');

  var ValidationSpecificationName = {
    HASHTAGS: 'hashtagsSpecification',
    DESCRIPTION: 'descriptionSpecification',
    UPLOAD_FILE: 'uploadFileSpecification'
  };


  //  Спецификация для хеш-тегов
  var hashtagsSpecification = (function () {
    var MAX_COUNT = 5;
    var HASHTAGS_SEPARATOR = ' ';
    var HASHTAGS_MIN_LENGTH = 2;
    var HASHTAGS_MAX_LENGTH = 20;
    var HASHTAGS_DESCRIPTION = /(^#[A-Za-zА-Яа-я0-9]+$){1}/;

    var hashtagsValiditiesErrors = {
      isHashtagsCount: {
        isValid: true,
        message: 'Число хэш-тегов не должно быть больше ' + MAX_COUNT + '-ти.'
      },
      isMinLength: {
        isValid: true,
        message: 'Длина хэш-тега не должна быть меньше ' + HASHTAGS_MIN_LENGTH + '-х символов.'
      },
      isMaxLength: {
        isValid: true,
        message: 'Длина хэш-тега не должна быть больше ' + HASHTAGS_MAX_LENGTH + '-ти символов.'
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
      maxHashtagsCount: MAX_COUNT,
      separator: HASHTAGS_SEPARATOR,
      minLength: HASHTAGS_MIN_LENGTH,
      maxLength: HASHTAGS_MAX_LENGTH,
      description: HASHTAGS_DESCRIPTION,
      validitiesErrors: hashtagsValiditiesErrors
    };
    return specification;
  })();

  //  Спецификация для комментария (описания) для формы загрузки нового изображения
  var textDescriptionSpecification = (function () {
    var TEXT_MIN_LENGTH = textDescriptionInput.getAttribute('minlength');
    var TEXT_MAX_LENGTH = textDescriptionInput.getAttribute('maxlength');

    var textValiditiesErrors = {
      isMaxLength: {
        isValid: true,
        message: 'Длина комментария не должна быть больше ' + TEXT_MAX_LENGTH + ' символов.'
      }
    };

    var specification = {
      name: ValidationSpecificationName.DESCRIPTION,
      minLength: TEXT_MIN_LENGTH,
      maxLength: TEXT_MAX_LENGTH,
      validitiesErrors: textValiditiesErrors
    };
    return specification;
  })();

  //  Спецификация для типа загружаемого файла
  var uploadFileSpecification = (function () {
    var FILE_TYPES = ['.png', '.jpg', '.jpeg'];

    var uploadFilePattern = FILE_TYPES.map(function (currentType) {
      return ('(' + currentType + '$){1}');
    }).join('|');

    var uploadFileValiditiesErrors = {
      isPatternValid: {
        isValid: true,
        message: 'Выберите правильный формат файла для загрузки: .png, .jpg, .jpeg.'
      }
    };

    var specification = {
      name: ValidationSpecificationName.UPLOAD_FILE,
      fileTypes: FILE_TYPES,
      pattern: uploadFilePattern,
      validitiesErrors: uploadFileValiditiesErrors
    };
    return specification;
  })();


  window.specifications = {
    names: ValidationSpecificationName,
    uploadFile: uploadFileSpecification,
    hashtags: hashtagsSpecification,
    description: textDescriptionSpecification
  };
})();
