applicationID = 'F7FD2183'
session = null

if (!chrome.cast || !chrome.cast.isAvailable)
	setTimeout initializeCastApi, 1000

initializeCastApi = () ->
	sessionsRequest = new chrome.cast.SessionRequest applicationID
	apiConfig = new chrome.cast.ApiConfig sessionRequest, sessionListener, receiverListener

	chrome.cast.initialize apiConfig, onInitSuccess, onError

onInitSucsess = () -> console.log 'onInitSuccess'
onError = () -> console.log 'onError: ' + JSON.stringify message
onSuccess = (message) ->
	console.log 'onSucsess: ' + JSON.stringify message
	if message['type'] == 'load'
		document.querySelector("#kill")
