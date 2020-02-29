'use strict';

(function () {
  var messageTemplate = {
    loadError: document.querySelector('#load-error')
  };

  var main = document.querySelector('main');
  var messageClass = '';

  var renderMessage = function (template) {
    var fragment = document.createDocumentFragment();
    var messageElement = template.content.cloneNode(true);
    fragment.appendChild(messageElement);
    window.console.log(template);
    messageClass = '.' + template.id;
    window.console.log(messageClass);
    main.appendChild(fragment);
  };

  var onMessageButtonClick = function (evt) {
    main.removeChild(evt.currentTarget);
  };

  var createLoadMessage = function (template) {
    renderMessage(template);

    var messageContainer = main.querySelector(messageClass);
    messageContainer.addEventListener('click', onMessageButtonClick);
  };

  window.loadMessage = {
    messageTemplate: messageTemplate,
    create: createLoadMessage
  };
})();
