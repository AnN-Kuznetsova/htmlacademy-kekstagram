'use strict';

(function () {
  var focusIndex = window.parameters.focusIndex;

  var pictures = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var imgFilters = document.querySelector('.img-filters');

  var currentElement;

  var focusOut = function (focusElement) {
    changeFocus(focusIndex.REMOVE);
    currentElement = focusElement;
  };

  var focusIn = function () {
    changeFocus(focusIndex.ADD);
    replaceCurrentElement();
  };

  var replaceCurrentElement = function () {
    currentElement.focus();
  };

  var changeFocus = function (tabindex) {
    var tabIndexChange = function (elementsArray) {
      for (var i = 0; i < elementsArray.length; i++) {
        elementsArray[i].tabIndex = tabindex;
      }
    };

    tabIndexChange(pictures.querySelectorAll('.picture'));
    tabIndexChange(footer.querySelectorAll('a'));
    tabIndexChange(imgFilters.querySelectorAll('button'));
  };

  window.windowFocus = {
    focusOut: focusOut,
    focusIn: focusIn
  };
})();
