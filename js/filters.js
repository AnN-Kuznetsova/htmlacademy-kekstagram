'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;

  var imgFilters = document.querySelector('.img-filters');
  var filters = imgFilters.querySelectorAll('.img-filters__button');


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


  var getPhotoFilterName = function (name) {
    return ('filter-' + name);
  };

  var addFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');

    filters.forEach(function (filter) {
      filter.addEventListener('click', onFilterClick);
    });
  };

  var onFilterClick = function (evt) {
    filters.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    setFilter(evt.target.id);
  };

  var setFilter = function (filterName) {
    var photoFilter = getFilter(filterName);
    var filteredPhotos = getFilteredPhotos(photoFilter);
    addFilter(filteredPhotos);
  };

  var getFilter = function (filterName) {
    var photoFilter;
    for (var filter in photoFilters) {
      if (filter) {
        if (getPhotoFilterName(filter) === filterName) {
          photoFilter = filter;
          break;
        }
      }
    }
    return photoFilter;
  };

  var getFilteredPhotos = function (filterName) {
    var photos = window.parameters.photos.slice();
    return photoFilters[filterName](photos);
  };

  var addFilter = function (filteredPhotos) {
    window.preview(filteredPhotos);
  };


  window.filters = addFilters;
})();
