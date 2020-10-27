/**
 * Main JavaScript for handling Chromecast interactions.
 */

var applicationID = '55B4F0B8';
var namespace = 'urn:x-cast:io.github.kjxlstad';
var session = null;

if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}

function initializeCastApi() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);

  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

function onInitSuccess() {
  console.log('onInitSuccess');
}

function onError(message) {
  console.log('onError: ' + JSON.stringify(message));
}

function onSuccess(message) {
  console.log('onSuccess: ' + JSON.stringify(message));

  if (message['type'] == 'load') {
  	document.querySelector('#cast-note').style = 'display: block';
  }
}

function onStopAppSuccess() {
	console.log('onStopAppSuccess');
	document.querySelector('#cast-note').style = 'display: none';
}

function sessionListener(e) {
  console.log('New session ID: ' + e.sessionId);
  session = e;
  session.addUpdateListener(sessionUpdateListener);
}

function sessionUpdateListener(isAlive) {
  console.log((isAlive ? 'Session Updated' : 'Session Removed') + ': ' + session.sessionId);
  if (!isAlive) {
    session = null;
  }
};

function receiverListener(e) {
  // Due to API changes just ignore this.
}

function sendMessage(message) {
  if (session != null) {
    session.sendMessage(namespace, message, onSuccess.bind(this, message), onError);
  }
  else {
    chrome.cast.requestSession(function(e) {
      session = e;
      sessionListener(e);
      session.sendMessage(namespace, message, onSuccess.bind(this, message), onError);
    }, onError);
  }
}

function stopApp() {
  session.stop(onStopAppSuccess, onError);
}

function connect() {
  console.log('connect()');
  sendMessage({
    type: 'load',
    url: 'http://www.gabenewell.org/',
    refresh: '',
  });
}
