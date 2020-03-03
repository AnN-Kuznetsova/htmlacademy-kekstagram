'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filters = imgFilters.querySelectorAll('.img-filters__button');

  var photoFilters = window.photoFiltersSettings;


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
    window.preview(filteredPhotos);
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

  var getPhotoFilterName = function (name) {
    return ('filter-' + name);
  };

  var getFilteredPhotos = function (filterName) {
    var photos = window.gallery.slice();
    return photoFilters[filterName](photos);
  };


  window.photoFilters = addFilters;
})();
