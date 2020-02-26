'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var footer = document.querySelector('footer');
  var imgFilters = document.querySelector('.img-filters');

  var windowFocus = {
    FOCUS_REMOVE_INDEX: '-1',
    FOCUS_ADD_INDEX: '0',

    focusOut: function (focusElement) {
      this.changeFocus(this.FOCUS_REMOVE_INDEX);
      this.currentElement = focusElement;
    },

    focusIn: function () {
      windowFocus.changeFocus(this.FOCUS_ADD_INDEX);
      windowFocus.replaceCurrentElement();
    },

    replaceCurrentElement: function () {
      this.currentElement.focus();
    },

    changeFocus: function (tabindex) {
      var tabIndexChange = function (elementsArray) {
        for (var i = 0; i < elementsArray.length; i++) {
          elementsArray[i].tabIndex = tabindex;
        }
      };

      tabIndexChange(pictures.querySelectorAll('.picture'));
      tabIndexChange(footer.querySelectorAll('a'));
      tabIndexChange(imgFilters.querySelectorAll('button'));
    }
  };

  window.windowFocus = windowFocus;
})();
