'use strict';

(function () {
  var DEFAULT_EFFECT_NAME = window.parameters.effect.DEFAULT_NAME;
  var DEFAULT_EFFECT_VALUE = window.parameters.effect.DEFAULT_VALUE;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');

  var filters = window.parameters.filters;
  var filterEffect = window.parameters.filterEffectObject;

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
    window.slider.init();
  };

  var setEffect = function (evt) {
    removeEffect();
    addEffect(evt.target.id);
    window.slider.init();
  };

  window.effect = {
    set: setEffect,
    reset: resetEffect
  };
})();
