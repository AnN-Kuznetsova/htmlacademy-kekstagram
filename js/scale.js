'use strict';

(function () {
  var MIN_SCALE = window.parameters.scale.MIN;
  var MAX_SCALE = window.parameters.scale.MAX;
  var SCALE_STEP = window.parameters.scale.STEP;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

  var getScaleValue = function () {
    return parseInt(scaleControlValue.value.slice(0, (scaleControlValue.value.length - 1)), 10);
  };

  var renderScale = function (scale) {
    scaleControlValue.value = scale + '%';
    scale = (scale / 100);
    imgUploadPreview.style.transform = 'scale(' + scale + ')';
  };

  var scaleDecrease = function () {
    var scaleValue = getScaleValue();
    if (scaleValue > MIN_SCALE) {
      scaleValue -= SCALE_STEP;
    }
    renderScale(scaleValue);
  };

  var scaleIncrease = function () {
    var scaleValue = getScaleValue();
    if (scaleValue < MAX_SCALE) {
      scaleValue += SCALE_STEP;
    }
    renderScale(scaleValue);
  };

  window.scale = {
    increase: scaleIncrease,
    decrease: scaleDecrease,
    render: renderScale
  };
})();
