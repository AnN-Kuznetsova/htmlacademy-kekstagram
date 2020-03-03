'use strict';

(function () {
  var messageTemplate = {
    loadError: document.querySelector('#error'),
    loadSuccess: document.querySelector('#success'),
    loadMessages: document.querySelector('#messages')
  };

  var main = document.querySelector('main');
  var message;

  var createMessage = function (template, messageText, buttonText) {
    if (message) {
      removeMessage();
    }

    renderMessage(template, messageText, buttonText);
    window.windowFocus.focusOut();

    if (message && message.querySelector('button')) {
      message.addEventListener('click', onMessageButtonClick);
      document.addEventListener('keydown', onMessageContainerEscPress);
      message.querySelector('button').focus();
    }
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
    message = document.createElement('div');
    message.classList.add('js-message--' + template.id);
    message.appendChild(fragment);
    main.appendChild(message);
  };

  var removeMessage = function () {
    main.removeChild(message);
    message = null;
    document.removeEventListener('keydown', onMessageContainerEscPress);
    window.windowFocus.focusIn();
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
