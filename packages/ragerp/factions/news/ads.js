var adsStack = [];
var editStack = [];

var editPushTimer = setInterval(() => {
    if (editStack.length > 0) {
        mp.players.forEach((currentPlayer) => {
            currentPlayer.call('pushAdToChat.client', [editStack.shift()]);
        });
    }
}, 60000);

mp.events.add('/ad', (player, message) => {
    adsStack.push({
        text: message.join(' '),
        sender: player.info.mainInfo.nickname,
        senderId: player.id,
    });
    player.call('pushChatMessage.client', [`Объявление отправлено`]);
});

mp.events.add('/adlist', (player) => {
    adsStack.forEach(function (current, index){
        player.call('pushChatMessage.client', [`${index} ${current.sender}: ${current.text}`]);
    });
})

mp.events.add('/editlist', (player) => {
    editStack.forEach(function (current, index){
        player.call('pushChatMessage.client', [`${index} ${current.sender}: ${current.text} (${current.editor}: ${current.editorId})`]);
    });
})

mp.events.add('/getad', (player) => {
        if (adsStack.length > 0) {
            player.currentAd = adsStack.shift();
            player.call('pushChatMessage.client', [`${player.currentAd.text} ${player.currentAd.sender} ${player.currentAd.senderId}`]);
        }
});

mp.events.add('/editad', (player, args) => {
    if (player.currentAd) {
        if (args[0] == 0){
            args.splice(0, 1);
            let reason = args;
            if (player.currentAd.sender != mp.players.at(player.currentAd.senderId).info.mainInfo.nickname) {
                player.call('showEditError.client', ['Отправитель объявления вышел из игры'])
                player.currentAd = false;
                return;
            }
            try {
                mp.players.at(player.currentAd.senderId).call('getEditAnswer.client', [false, reason]);
            } catch(err) {
                console.log(err);
            }
            player.currentAd = false;
        }
        if (args[0] == 1){
            args.splice(0, 1);
            let text = args;
            try {
                mp.players.at(player.currentAd.senderId).call('getEditAnswer.client', [true]);
                editStack.push({
                    text: text,
                    sender: player.currentAd.sender,
                    senderId: player.currentAd.senderId,
                    editor: player.info.mainInfo.nickname,
                    editorId: player.id
                });
            } catch(err) {
                console.log(err);
            }
            player.currentAd = false;
        }
        
    }
});