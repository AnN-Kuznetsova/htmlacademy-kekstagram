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

  //  Функция закрытия попапа по нажатию на ESC
  var onPopupEscPress = function (evt, target, closePopup) {
    window.util.isEscEvent(evt, function () {
      if (((target.tagName === 'INPUT') && (target.type === 'text')) || (target.tagName === 'TEXTAREA')) {
        target.blur();
      } else {
        closePopup();
      }
    });
  };

  window.util = {
    isEscEvent: onEscPress,
    isEnterEvent: onEnterPress,
    onPopupEscPress: onPopupEscPress
  };
})();
