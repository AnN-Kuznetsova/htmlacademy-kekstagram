'use strict';

(function () {
  var FILE_TYPES = window.specifications.uploadFile.fileTypes;

  var imgUploadForm = document.querySelector('.img-upload__form');
  var messageTemplate = window.loadMessage.messageTemplate;

  var previewElement;
  var effectsPreviewElements;


  var matches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var setPreviewImg = function (imgUrl) {
    previewElement.src = imgUrl;

    effectsPreviewElements.forEach(function (element) {
      element.style.backgroundImage = 'url(' + imgUrl + ')';
    });
  };

  var onReaderLoad = function (evt) {
    setPreviewImg(evt.target.result);
    window.loadMessage.remove();
    window.windowFocus.changeFormDisabled(imgUploadForm, false);
  };

  var setUploadedPhoto = function (fileInput, previewElementValue, effectsPreviewElementsValue) {
    var file = fileInput.files[0];
    var fileName = '';
    var reader;

    previewElement = previewElementValue;
    effectsPreviewElements = effectsPreviewElementsValue;

    if (file) {
      fileName = file.name.toLowerCase();

      if (matches(fileName)) {
        window.loadMessage.create(messageTemplate.loadMessages);
        window.windowFocus.changeFormDisabled(imgUploadForm, true);
        reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      }
    }
  };


  window.uploadedPhotoPreview = setUploadedPhoto;
})();
