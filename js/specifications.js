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

  //  Спецификация для комментария (описания) для формы загрузки нового изображения
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

  //  Спецификация для типа загружаемого файла
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


  window.specifications = {
    names: ValidationSpecificationName,
    uploadFile: uploadFileSpecification,
    hashtags: hashtagsSpecification,
    description: textDescriptionSpecification
  };
})();
