window.onload = () ->
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance()
	console.log 'Starting Receiver Manager'

	castReceiverManager.onReady = (event) ->
		console.log "Received Ready event: #{JSON.stringify event.data}"
		window.castReceiverManager.setApplicationState 'chromecast is ready...'

	castReceiverManager.onSenderConnected = (event) ->
		console.log "Received Sender Connected event: #{event.senderId}"

	castReceiverManager.onSenderDisconnected = (event) ->
		console.log "Received Sender Disconnected event: #{event.senderId}"

	window.messageBus =
		window.castReceiverManager.getCastMessageBus(
			'urn:x-cast:io.github.kjxlstad',
			cast.receiver.CastMessageBus.MessageType.JSON
		)

	window.messageBus.onMessage = (event) ->
		console.log "Message [#{event.senderId}]: #{event.data}"

		if event.data['type'] == 'load'
			(document.querySelector '#test').innerHTML = 'actually working'

	window.castReceiverManager.start
		statusText: 'Application is starting'
	console.log 'Receiver Manager started'
