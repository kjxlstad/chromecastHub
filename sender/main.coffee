applicationID = '18745296'
namespace = 'urn:x-cast:me.enra'
session = null

if !chrome.cast
	setTimeout () ->
		initializeCastApi()
	, 1000

initializeCastApi = () ->
	sessionRequest = new chrome.cast.SessionRequest applicationID
	apiConfig = new chrome.cast.ApiConfig sessionRequest, sessionListener, receiverListener
	chrome.cast.initialize apiConfig, onInitSuccess, onError

onInitSuccess = () -> console.log 'onInitSuccess'
onError = (onError) -> console.log 'onError: ' + JSON.stringify message
onSuccess = (message) ->
	console.log 'onSucsess: ' + JSON.stringify message
	if message['type'] == 'load'
		(document.querySelector '#kill').disabled = false
		(document.querySelector '#cast-note').style = 'display: block'

onStopAppSuccess = () ->
	console.log 'onStopAppSuccess'
	(document.querySelector '#kill').enabled = true
	(document.querySelector '#cast-note').style = 'display: none'

sessionListener = (e) ->
	console.log 'New session ID: ' + e.sessionId
	session = e
	session.addUpdateListener sessionUpdateListener

sessionUpdateListener = (isAlive) ->
	if (isAlive)
		console.log 'Session Updated'
	else
		console.log 'Session Removed' + ': ' + session.sessionId
		session = null

receiverListener = () ->

sendMessage = (message) ->
	if (session != null)
		session.sendMessage namespace, message, (onSuccess.bind this, message), onError
	else
		chrome.cast.requestSession (e) ->
			session = e
			sessionListener e
			session.sendMessage namespace, message, (onSuccess.bind this, message), onError
		, onError


stopApp = () ->
	session.stop onStopAppSuccess, onError

connect = () ->
	console.log 'connect()'
	sendMessage
		type: 'load'
		url: 'https://kjxlstad.git'
		refresh: 'test'





