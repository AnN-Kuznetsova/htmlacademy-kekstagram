'use strict';

(function () {
  var messageTemplate = {
    loadError: document.querySelector('#error')
  };

  var main = document.querySelector('main');
  var messageClass = '';

  var createMessage = function (template, messageText, buttonText) {
    renderMessage(template, messageText, buttonText);

    var messageContainer = main.querySelector(messageClass);
    messageContainer.addEventListener('click', onMessageButtonClick);
  };

  var renderMessage = function (template, messageText, buttonText) {
    var fragment = document.createDocumentFragment();
    var messageElement = template.content.cloneNode(true);

    if (messageText) {
      messageElement.querySelector('.error__title').textContent = messageText;
    }
    if (buttonText) {
      messageElement.querySelector('.error__button').textContent = buttonText;
    }

    fragment.appendChild(messageElement);
    messageClass = '.' + template.id;
    main.appendChild(fragment);
  };

  var onMessageButtonClick = function (evt) {
    main.removeChild(evt.currentTarget);
  };


  window.loadMessage = {
    messageTemplate: messageTemplate,
    create: createMessage
  };
})();
