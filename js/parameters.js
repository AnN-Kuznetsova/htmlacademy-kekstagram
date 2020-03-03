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
      return 'blur(' + (effectValue * 3 / 100) + 'px)';
    },
    'heat': function (effectValue) {
      return 'brightness(' + (effectValue * 2 / 100 + 1) + ')';
    }
  };

  var filterEffectObject = (function () {
    var effectObject = {};
    effectObject.createClass = function (name) {
      return ('effects__preview--' + name);
    };

    effectObject.name = Effect.DEFAULT_NAME;
    effectObject.value = Effect.DEFAULT_VALUE;
    effectObject.class = effectObject.createClass(effectObject.name);
    return effectObject;
  })();

  /* var photoFilters = {

  }; */

  window.parameters = {
    photos: [],
    scale: Scale,
    effect: Effect,
    effectFilters: effectFilters,
    filterEffectObject: filterEffectObject
  };
})();
