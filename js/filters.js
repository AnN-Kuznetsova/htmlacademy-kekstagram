'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filters = imgFilters.querySelectorAll('.img-filters__button');

  var addFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');

    filters.forEach(function (filter) {
      filter.addEventListener('click', onFilterClick);
    });
  };

  var onFilterClick = function (evt) {
window.console.log(evt.target.id);
  };

  window.filters = addFilters;
})();
