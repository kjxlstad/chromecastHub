// Generated by CoffeeScript 1.12.7
window.onload = function() {
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  console.log('Starting Receiever Manager');
  castReceiverManager.onReady = function(event) {
    console.log("Receieved Ready event: " + (JSON.stringify(event.data)));
    return window.castReceiverManager.setApplicationState('cast is ready');
  };
  castReceieverManager.onSenderConnected = function(event) {
    return console.log("Receieved Sender Connected event: " + event.senderId);
  };
  castReceiverManager.onSenderDisconnected = function(event) {
    return console.log("Receieved Sender Disconnected event: " + event.senderId);
  };
  window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:io.github.kjxlstad', cast.receiver.CastMessageBus.MessageType.JSON);
  window.messageBus.onMessage = function(event) {
    console.log("Message [" + event.senderId + "]: " + event.data);
    if (event.data['type'] === 'load') {
      return (document.querySelector('#test')).innerHTML = 'actually working';
    }
  };
  window.castReceiverManager.start({
    statusText: 'Application is starting'
  });
  return console.log('Receiever Manager started');
};
