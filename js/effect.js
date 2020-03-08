'use strict';

(function () {
  var DEFAULT_EFFECT_NAME = window.effectSettings.effect.DEFAULT_NAME;
  var DEFAULT_EFFECT_VALUE = window.effectSettings.effect.DEFAULT_VALUE;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectsRradioButtons = imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelValueInput = effectLevel.querySelector('.effect-level__value');

  var filterEffect = window.effectSettings.filterEffectObject;

  var removeEffect = function () {
    if (filterEffect.classTitle) {
      imgUploadPreview.classList.remove(filterEffect.classTitle);
    }
  };

  var addEffect = function (effectName) {
    filterEffect.name = effectName;
    filterEffect.classTitle = filterEffect.createClassTitle(effectName);
    filterEffect.value = DEFAULT_EFFECT_VALUE;
    effectLevelValueInput.value = filterEffect.value;
    imgUploadPreview.classList.add(filterEffect.classTitle);
  };

  var resetEffect = function () {
    removeEffect();
    for (var i = 0; i < effectsRradioButtons.length; i++) {
      if (effectsRradioButtons[i].value === DEFAULT_EFFECT_NAME) {
        effectsRradioButtons[i].checked = true;
        addEffect(effectsRradioButtons[i].value);
      }
    }
    window.slider.init();
  };

  var setEffect = function (evt) {
    removeEffect();
    addEffect(evt.target.value);
    window.slider.init();
  };

  window.effect = {
    set: setEffect,
    reset: resetEffect
  };
})();
