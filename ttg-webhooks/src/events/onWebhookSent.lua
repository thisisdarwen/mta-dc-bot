local webhookTypes = {
    'https://discord.com/api/webhooks/874806365347004456/jGCogw32QEajyrCYzewnNRRPy_uJ9rlvWjhnkocZ6letHiKKQ0ZQPSODP4Zu_Qm44gOJ'
}

addEvent('onWebhookSent', true)
addEventHandler('onWebhookSent', root, function(playerName, theMessage, type)
        local message = Webhook.new(webhookTypes[type], playerName)
        if (message) then
            message:setContent(theMessage)
            message:Send(false)
        end
    end
)