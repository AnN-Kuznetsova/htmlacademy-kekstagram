'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  };

  var Effect = {
    DEFAULT_NAME: 'none',
    DEFAULT_VALUE: 100,
    NONE_NAME: 'none'
  };

  var effectFilters = {
    'none': function (effectValue) {
      effectValue = '';
      return effectValue;
    },
    'chrome': function (effectValue) {
      return 'grayscale(' + (effectValue / 100) + ')';
    },
    'sepia': function (effectValue) {
      return 'sepia(' + (effectValue / 100) + ')';
    },
    'marvin': function (effectValue) {
      return 'invert(' + effectValue + '%)';
    },
    'phobos': function (effectValue) {
      var MAX_EFFECT_VALUE = 3;
      return 'blur(' + (effectValue * MAX_EFFECT_VALUE / 100) + 'px)';
    },
    'heat': function (effectValue) {
      var MIN_EFFECT_VALUE = 1;
      var MAX_EFFECT_VALUE = 3;
      return 'brightness(' + (effectValue * (MAX_EFFECT_VALUE - MIN_EFFECT_VALUE) / 100 + MIN_EFFECT_VALUE) + ')';
    }
  };

  var filterEffectObject = (function () {
    var effectObject = {};
    effectObject.createClassTitle = function (name) {
      return ('effects__preview--' + name);
    };

    effectObject.name = Effect.DEFAULT_NAME;
    effectObject.value = Effect.DEFAULT_VALUE;
    effectObject.classTitle = effectObject.createClassTitle(effectObject.name);
    return effectObject;
  })();


  window.effectSettings = {
    scale: Scale,
    effect: Effect,
    effectFilters: effectFilters,
    filterEffectObject: filterEffectObject
  };
})();
