'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var filterDefaultFun = function (photos) {
    return photos;
  };

  var filterRandomFun = function (photos) {
    var filteredPhotos = [];
    for (var i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
      filteredPhotos.push(photos.splice((window.random.number(photos.length) - 1), 1)[0]);
    }
    return filteredPhotos;
  };

  var filterDiscussedFun = function (photos) {
    return photos.sort(function (left, right) {
      return (right.comments.length - left.comments.length);
    });
  };

  var photoFilters = {
    'default': filterDefaultFun,
    'random': filterRandomFun,
    'discussed': filterDiscussedFun
  };


  window.photoFiltersSettings = photoFilters;
})();
