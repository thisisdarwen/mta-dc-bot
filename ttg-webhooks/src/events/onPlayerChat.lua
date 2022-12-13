addEventHandler('onPlayerChat', root, function(message, messageType)
        if messageType > 0 then
            return
        end
        return triggerEvent('onWebhookSent', resourceRoot, removeHex(getPlayerName(source)) , removeHex(message), 1)
    end
)