window.onload = () ->
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance()
	console.log 'Starting Receiever Manager'
	
	castReceiverManager.onReady = (event) ->
		console.log "Receieved Ready event: #{JSON.stringify event.data}"
		window.castReceiverManager.setApplicationState 'cast is ready'

	castReceieverManager.onSenderConnected = (event) ->
		console.log "Receieved Sender Connected event: #{event.senderId}"

	castReceiverManager.onSenderDisconnected = (event) ->
		console.log "Receieved Sender Disconnected event: #{event.senderId}"

	window.messageBus =
		window.castReceiverManager.getCastMessageBus 'urn:x-cast:io.github.kjxlstad', cast.receiver.CastMessageBus.MessageType.JSON
	window.messageBus.onMessage = (event) ->
		if event.data['type'] == 'load'
			(document.querySelector '#test').innerHTML = 'working'

	window.castReceiverManager.start {statusText: 'Application is starting'}
	console.log 'Receiever Manager started'
