'use strict';

(function () {
  var isArrayLength = function (array, maxLength) {
    return (array.length > maxLength) ? false : true;
  };

  var isMoreMinLength = function (str, minLength) {
    return (str.length >= minLength);
  };

  var isLessMaxLength = function (str, maxLength) {
    return (str.length <= maxLength);
  };

  var isPattern = function (str, pattern) {
    return RegExp(pattern).test(str);
  };

  var isArrayElementDuplicate = function (element, index, array) {
    return !(array.includes(element, (index + 1)));
  };


  window.validationFunctions = {
    isArrayLength: isArrayLength,
    isMoreMinLength: isMoreMinLength,
    isLessMaxLength: isLessMaxLength,
    isPattern: isPattern,
    isArrayElementDuplicate: isArrayElementDuplicate
  };
})();
