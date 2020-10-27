window.onload = () ->
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance()
	
	castReceiverManager.onReady = (event) ->
		window.castReceiverManager.setApplicationState 'cast is ready'

	window.messageBus =
		window.castReceiverManager.getCastMessageBus 'urn:x-cast:me.enra', cast.receiver.CastMessageBus.MessageType.JSON
	window.messageBus =
		if event.data['type'] == 'load'
			(document.querySelector '#test').innerHTML = 'working'

	window.castReceiverManager.start {statusText: 'Application is starting'}
