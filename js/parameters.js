'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  };

  var Effect = {
    DEFAULT_NAME: 'effect-none', // 'effects__preview--none';
    DEFAULT_VALUE: 100, // effectLevelValueInput.value;
    NONE_NAME: 'effect-none'
  };

  var filters = {
    'effect-none': {
      className: 'effects__preview--none',
      lawСreation: function (effectValue) {
        effectValue = '';
        return effectValue;
      }
    },
    'effect-chrome': {
      className: 'effects__preview--chrome',
      lawСreation: function (effectValue) {
        return 'grayscale(' + (effectValue / 100) + ')';
      }
    },
    'effect-sepia': {
      className: 'effects__preview--sepia',
      lawСreation: function (effectValue) {
        return 'sepia(' + (effectValue / 100) + ')';
      }
    },
    'effect-marvin': {
      className: 'effects__preview--marvin',
      lawСreation: function (effectValue) {
        return 'invert(' + effectValue + '%)';
      }
    },
    'effect-phobos': {
      className: 'effects__preview--phobos',
      lawСreation: function (effectValue) {
        return 'blur(' + (effectValue * 3 / 100) + 'px)';
      }
    },
    'effect-heat': {
      className: 'effects__preview--heat',
      lawСreation: function (effectValue) {
        return 'brightness(' + (effectValue * 2 / 100 + 1) + ')';
      }
    }
  };

  var filterEffectObject = (function () {
    var effectObject = {};
    effectObject.name = Effect.DEFAULT_NAME;
    effectObject.value = Effect.DEFAULT_VALUE;
    effectObject.class = filters[effectObject.name].className;
    return effectObject;
  })();

  window.parameters = {
    scale: Scale,
    effect: Effect,
    filters: filters,
    filterEffectObject: filterEffectObject
  };
})();
