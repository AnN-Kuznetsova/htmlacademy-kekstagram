'use strict';
(function () {
  var StatusCode = window.util.StatusCode;
  var TIMEOUT = window.util.timeout;

  var URL = {
    save: 'https://javascript.pages.academy/kekstagram',
    load: 'https://javascript.pages.academy/kekstagram/data'
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    dataLoadHandler(xhr, onLoad, onError);

    return xhr;
  };

  var dataLoadHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (true) {
        case (xhr.status === StatusCode.OK):
          onLoad(xhr.response);
          break;
        case RegExp(StatusCode.CLIENT).test(xhr.status):
          onError('Ошибка запроса данных');
          break;
        case RegExp(StatusCode.SERVER).test(xhr.status):
          onError('Ошибка загрузки данных с сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', URL.save);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('GET', URL.load);
    xhr.send();
  };


  window.backend = {
    load: load,
    save: save
  };
})();
