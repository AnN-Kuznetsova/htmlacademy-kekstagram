'use strict';

(function () {
  //  Функция нахождения случайного числа
  var randomNumber = function (num) {
    return Math.floor(Math.random() * (num + 1));
  };

  //  Функция выбора случачйного элемента массива
  var getRandomArrayElement = function (array) {
    return array[randomNumber(array.length - 1)];
  };

  window.random = {
    number: randomNumber,
    arrayElement: getRandomArrayElement
  };
})();
