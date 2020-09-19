mp.events.add('getEditAnswer.client', (answer, reason) => {
    if (answer) {
        mp.events.call('pushChatMessage.client', `!{#a8ff60}Ваше объявление отредактировано и поставлено в очередь на публикацию`);
    } else {
        mp.events.call('pushChatMessage.client', `!{#ff8142}Ваше объявление отклонено. Причина: ${reason.join()}`);
    }
});

mp.events.add('pushAdToChat.client', (ad) => {
    mp.events.call('pushChatMessage.client', `!{#83d822}${ad.text.join(' ')} | Отправил ${ad.sender}[${ad.senderId}] (т. 1999999)`);
    mp.events.call('pushChatMessage.client', `!{#498405}Объявление отредактировал сотрудник СМИ ${ad.editor}[${ad.editorId}]`);
});


mp.events.add('showEditError.client', (message) => {
    mp.events.call('pushChatMessage.client', `!{#ff8142}${message}`);
});