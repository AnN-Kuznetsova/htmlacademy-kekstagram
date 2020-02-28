'use strict';

(function () {
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_LEFT: 'ArrowLeft'
  };

  var onEscPress = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };

  var onEnterPress = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  var onArrowRightPress = function (evt, action) {
    if (evt.key === Key.ARROW_RIGHT) {
      action();
    }
  };

  var onArrowLeftPress = function (evt, action) {
    if (evt.key === Key.ARROW_LEFT) {
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
    isArrowRightEvent: onArrowRightPress,
    isArrowLeftEvent: onArrowLeftPress,
    onPopupEscPress: onPopupEscPress
  };
})();
