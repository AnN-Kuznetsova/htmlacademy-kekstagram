'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var onEscPress = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var onEnterPress = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    isEscEvent: onEscPress,
    isEnterEvent: onEnterPress
  };
})();
