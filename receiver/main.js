// Generated by CoffeeScript 1.12.7
window.onload = function() {
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  castReceiverManager.onReady = function(event) {
    return window.castReceiverManager.setApplicationState('cast is ready');
  };
  window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:io.github.kjxlstad', cast.receiver.CastMessageBus.MessageType.JSON);
  window.messageBus = event.data['type'] === 'load' ? (document.querySelector('#test')).innerHTML = 'working' : void 0;
  return window.castReceiverManager.start({
    statusText: 'Application is starting'
  });
};
