'use strict';

(function () {
  var messageTemplate = {
    loadError: document.querySelector('#error')
  };

  var main = document.querySelector('main');
  var message = {};

  var createMessage = function (template, messageText, buttonText) {
    renderMessage(template, messageText, buttonText);

    message.container = main.querySelector(message.class);
    message.container.addEventListener('click', onMessageButtonClick);
    document.addEventListener('keydown', onMessageContainerEscPress);
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
    message.class = '.' + template.id;
    main.appendChild(fragment);
  };

  var removeMessage = function () {
    main.removeChild(message.container);
    document.removeEventListener('keydown', onMessageContainerEscPress);
  };

  var onMessageButtonClick = function () {
    removeMessage();
  };

  var onMessageContainerEscPress = function (evt) {
    window.util.isEscEvent(evt, removeMessage);
  };


  window.loadMessage = {
    messageTemplate: messageTemplate,
    create: createMessage
  };
})();
