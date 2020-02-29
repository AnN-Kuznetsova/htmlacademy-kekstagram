'use strict';
(function () {
  var StatusCode = window.util.StatusCode;
  var TIMEOUT = window.util.timeout;

  var URL = {
    save: 'https://js.dump.academy/kekstagram',
    load: 'https://js.dump.academy/kekstagram/data1'
  };

  var dataLoadHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    dataLoadHandler(xhr, onLoad, onError);

    xhr.open('POST', URL.save);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    dataLoadHandler(xhr, onLoad, onError);

    xhr.open('GET', URL.load);
    xhr.send();
  };


  window.backend = {
    load: load,
    save: save
  };
})();
