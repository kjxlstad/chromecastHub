// Generated by CoffeeScript 1.12.7
var applicationID, connect, initializeCastApi, namespace, onError, onInitSuccess, onStopAppSuccess, onSuccess, receiverListener, sendMessage, session, sessionListener, sessionUpdateListener, stopApp;

applicationID = '18745296';

namespace = 'urn:x-cast:io.github.kjxlstad';

session = null;

if (!chrome.cast) {
  setTimeout(function() {
    return initializeCastApi();
  }, 1000);
}

initializeCastApi = function() {
  var apiConfig, sessionRequest;
  sessionRequest = new chrome.cast.SessionRequest(applicationID);
  apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
  return chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

onInitSuccess = function() {
  return console.log('onInitSuccess');
};

onError = function(onError) {
  return console.log('onError: ' + JSON.stringify(message));
};

onSuccess = function(message) {
  console.log('onSucsess: ' + JSON.stringify(message));
  if (message['type'] === 'load') {
    (document.querySelector('#kill')).disabled = false;
    return (document.querySelector('#cast-note')).style = 'display: block';
  }
};

onStopAppSuccess = function() {
  console.log('onStopAppSuccess');
  (document.querySelector('#kill')).enabled = true;
  return (document.querySelector('#cast-note')).style = 'display: none';
};

sessionListener = function(e) {
  console.log('New session ID: ' + e.sessionId);
  session = e;
  return session.addUpdateListener(sessionUpdateListener);
};

sessionUpdateListener = function(isAlive) {
  if (isAlive) {
    return console.log('Session Updated');
  } else {
    console.log('Session Removed' + ': ' + session.sessionId);
    return session = null;
  }
};

receiverListener = function() {};

sendMessage = function(message) {
  if (session !== null) {
    return session.sendMessage(namespace, message, onSuccess.bind(this, message), onError);
  } else {
    return chrome.cast.requestSession(function(e) {
      session = e;
      sessionListener(e);
      return session.sendMessage(namespace, message, onSuccess.bind(this, message), onError);
    }, onError);
  }
};

stopApp = function() {
  return session.stop(onStopAppSuccess, onError);
};

connect = function() {
  console.log('connect()');
  return sendMessage({
    type: 'load',
    url: 'https://kjxlstad.github.io/chromecastHub/receiver',
    refresh: 'test'
  });
};
