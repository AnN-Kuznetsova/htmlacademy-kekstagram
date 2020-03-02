'use strict';

(function () {
  var FocusIndex = {
    REMOVE: '-1',
    ADD: '0',
    DEFAULT_FOCUS_ELEMENT: document.querySelector('.img-upload__label')
  };

  var pictures = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var imgFilters = document.querySelector('.img-filters');

  var currentElement;

  var focusOut = function (focusElement) {
    changeFocus(FocusIndex.REMOVE);
    currentElement = focusElement ? focusElement : FocusIndex.DEFAULT_FOCUS_ELEMENT;
  };

  var focusIn = function () {
    changeFocus(FocusIndex.ADD);
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

    var focusedElements = [
      pictures.querySelectorAll('.picture'),
      footer.querySelectorAll('a'),
      imgFilters.querySelectorAll('button')
    ];

    focusedElements.forEach(function (element) {
      if (element) {
        tabIndexChange(element);
      }
    });
  };

  window.windowFocus = {
    focusOut: focusOut,
    focusIn: focusIn
  };
})();
