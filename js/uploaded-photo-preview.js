'use strict';

(function () {
  var FILE_TYPES = window.specifications.uploadFile.fileTypes;

  var matches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var onReaderLoad = function (evt) {
    window.uploadForm(evt.target.result);
  };

  var uploadPhoto = function (fileInput) {
    var file = fileInput.files[0];
    var fileName = '';
    var reader;

    if (file) {
      fileName = file.name.toLowerCase();

      if (matches(fileName)) {
        reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      }
    }
  };


  window.uploadedPhotoPreview = uploadPhoto;
})();
