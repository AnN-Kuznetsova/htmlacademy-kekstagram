'use strict';

(function () {
  var NONE_EFFECT_NAME = window.effectSettings.effect.NONE_NAME;
  var SLIDER_STEP = 10;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var filters = window.effectSettings.effectFilters;
  var filterEffect = window.effectSettings.filterEffectObject;


  // слайдер MouseDown
  var onSliderPinMouseDown = function (evt) {
    var line = effectLevelLine.getBoundingClientRect();
    var evtXStart = evt.clientX;

    var onSliderPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = (evtXStart - moveEvt.clientX);
      evtXStart = moveEvt.clientX;

      if ((effectLevelPin.offsetLeft - shiftX) < 0) {
        evtXStart = line.x;
      } else if ((effectLevelPin.offsetLeft - shiftX) > line.width) {
        evtXStart = line.x + line.width;
      }

      changeSlider(shiftX, evtXStart);
    };

    var onSliderPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onSliderPinMouseMove);
      document.removeEventListener('mouseup', onSliderPinMouseUp);
    };

    document.addEventListener('mousemove', onSliderPinMouseMove);
    document.addEventListener('mouseup', onSliderPinMouseUp);
  };

  // сдайдер Keydown
  var onSliderPinKeydown = function (evt) {
    window.util.isArrowLeftEvent(evt, function () {
      changeSlider(SLIDER_STEP);
    });
    window.util.isArrowDownEvent(evt, function () {
      changeSlider(SLIDER_STEP);
    });
    window.util.isArrowRightEvent(evt, function () {
      changeSlider(-SLIDER_STEP);
    });
    window.util.isArrowUpEvent(evt, function () {
      changeSlider(-SLIDER_STEP);
    });
  };

  // слайдер Click
  var onSliderLineClick = function (evt) {
    changeSlider(effectLevelPin.offsetLeft - (evt.clientX - effectLevelLine.getBoundingClientRect().x));
  };


  var changeSlider = function (shiftX) {
    var line = effectLevelLine.getBoundingClientRect();
    var pinOffsetLeft;

    switch (true) {
      case ((effectLevelPin.offsetLeft - shiftX) < 0):
        pinOffsetLeft = 0;
        break;
      case ((effectLevelPin.offsetLeft - shiftX) > line.width):
        pinOffsetLeft = line.width;
        break;
      default:
        pinOffsetLeft = effectLevelPin.offsetLeft - shiftX;
    }

    renderSliderPin(pinOffsetLeft);
    filterEffect.value = calculateEffectValue(effectLevelLine, effectLevelPin);
    effectLevelValueInput.value = filterEffect.value;
    renderEffect(filterEffect.name, filterEffect.value);
    renderSliderDepth(filterEffect.value);
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

  var renderSliderDepth = function (effectValue) {
    effectLevelDepth.style.width = effectValue + '%';
  };

  var renderSliderPin = function (pinOffset) {
    effectLevelPin.style.left = pinOffset + 'px';
  };

  var renderEffect = function (effectName, effectValue) {
    imgUploadPreview.style.filter = filters[effectName](effectValue);
  };

  var initSlider = function () {
    if (filterEffect.name === NONE_EFFECT_NAME) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
      renderSliderPin(calculatePinOffset(effectLevelLine, filterEffect.value));
      renderSliderDepth(filterEffect.value);
    }
    renderEffect(filterEffect.name, filterEffect.value);
  };


  window.slider = {
    onPinMouseDown: onSliderPinMouseDown,
    onPinKeydown: onSliderPinKeydown,
    onLineClick: onSliderLineClick,
    init: initSlider
  };
})();
