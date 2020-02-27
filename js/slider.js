'use strict';

(function () {
  var NONE_EFFECT_NAME = window.parameters.effect.NONE_NAME;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var filters = window.parameters.filters;
  var filterEffect = window.parameters.filterEffectObject;

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
    imgUploadPreview.style.filter = filters[effectName](effectValue);
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

  window.slider = {
    onPinMouseDown: onSliderPinMouseDown,
    onLineClick: onSliderLineClick,
    init: initSlider
  };
})();