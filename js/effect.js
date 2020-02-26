'use strict';

(function () {
  var DEFAULT_EFFECT_NAME = 'effect-none'; // 'effects__preview--none';
  var DEFAULT_EFFECT_VALUE = 100; // effectLevelValueInput.value;
  var NONE_EFFECT_NAME = 'effect-none';

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');

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

  var filterEffect = (function () {
    var effectObject = {};
    effectObject.name = DEFAULT_EFFECT_NAME;
    effectObject.value = DEFAULT_EFFECT_VALUE;
    effectObject.class = filters[effectObject.name].className;
    return effectObject;
  })();

  var removeEffect = function () {
    if (filterEffect.class) {
      imgUploadPreview.classList.remove(filterEffect.class);
    }
  };

  var addEffect = function (effectName) {
    filterEffect.name = effectName;
    filterEffect.class = filters[effectName].className;
    filterEffect.value = DEFAULT_EFFECT_VALUE;
    effectLevelValueInput.value = filterEffect.value;
    imgUploadPreview.classList.add(filterEffect.class);
  };

  var resetEffect = function () {
    removeEffect();
    for (var i = 0; i < effectsRradioButtons.length; i++) {
      if (effectsRradioButtons[i].id === DEFAULT_EFFECT_NAME) {
        effectsRradioButtons[i].checked = true;
        addEffect(effectsRradioButtons[i].id);
      }
    }
    initSlider();
  };

  var setEffect = function (evt) {
    removeEffect();
    addEffect(evt.target.id);
    initSlider();
  };


  /*  Слайдер  */
  var onSliderPinMouseDown = function (evt) {
    var line = effectLevelLine.getBoundingClientRect();
    var evtXStart = evt.clientX;

    var onSliderPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinOffsetLeft;
      var shiftX = (evtXStart - moveEvt.clientX);
      evtXStart = moveEvt.clientX;

      if ((effectLevelPin.offsetLeft - shiftX) < 0) {
        pinOffsetLeft = 0;
        evtXStart = line.x;
      } else if ((effectLevelPin.offsetLeft - shiftX) > line.width) {
        pinOffsetLeft = line.width;
        evtXStart = line.x + line.width;
      } else {
        pinOffsetLeft = effectLevelPin.offsetLeft - shiftX;
      }

      filterEffect.value = calculateEffectValue(effectLevelLine, effectLevelPin);
      renderSlider(pinOffsetLeft, filterEffect.value);
      renderEffect(filterEffect.name, filterEffect.value);
    };

    var onSliderPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      effectLevelValueInput.value = filterEffect.value;

      document.removeEventListener('mousemove', onSliderPinMouseMove);
      document.removeEventListener('mouseup', onSliderPinMouseUp);
    };

    document.addEventListener('mousemove', onSliderPinMouseMove);
    document.addEventListener('mouseup', onSliderPinMouseUp);
  };

  var onSliderLineClick = function (evt) {
    var pinOffsetLeft = evt.clientX - effectLevelLine.getBoundingClientRect().x;
    renderSlider(pinOffsetLeft, filterEffect.value);
    filterEffect.value = calculateEffectValue(effectLevelLine, effectLevelPin);
    effectLevelValueInput.value = filterEffect.value;
    renderEffect(filterEffect.name, filterEffect.value);
    renderSlider(pinOffsetLeft, filterEffect.value);
  };

  var calculateEffectValue = function (sliderLine, sliderPin) {
    var line = sliderLine.getBoundingClientRect();
    var pin = sliderPin.getBoundingClientRect();
    return Math.round((pin.x + (pin.width / 2) - line.x) * 100 / line.width);
  };

  var calculatePinOffset = function (sliderLine, effectValue) {
    var line = sliderLine.getBoundingClientRect();
    return (line.width * effectValue / 100);
  };

  var renderSlider = function (pinOffset, effectValue) {
    effectLevelDepth.style.width = effectValue + '%';
    effectLevelPin.style.left = pinOffset + 'px';
  };

  var renderEffect = function (effectName, effectValue) {
    imgUploadPreview.style.filter = filters[effectName].lawСreation(effectValue);
  };

  var initSlider = function () {
    if (filterEffect.name === NONE_EFFECT_NAME) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
      renderSlider(calculatePinOffset(effectLevelLine, filterEffect.value), filterEffect.value);
    }
    renderEffect(filterEffect.name, filterEffect.value);
  };


  window.effect = {
    set: setEffect,
    reset: resetEffect
  };

  window.slider = {
    onPinMouseDown: onSliderPinMouseDown,
    onLineClick: onSliderLineClick
  };
})();
