'use strict';

(function () {
  var FILE_TYPES = ['.jpg', '.jpeg', '.png'];

  var previewElement;


  var matches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var onReaderLoad = function (evt) {
    previewElement.src = evt.target.result;
  };

  var setUploadedPhoto = function (fileInput, previewElementValue) {
    var file = fileInput.files[0];
    var fileName = '';
    var reader;

    previewElement = previewElementValue;

    if (file) {
      fileName = file.name.toLowerCase();

      if (matches(fileName)) {
        reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      }
    }
  };


  window.uploadedPhotoPreview = setUploadedPhoto;
})();
