"use strict";

// updateChat - передаем набор характеристик
mp.events.addCommand('test', function (player, fullText) {
    mp.players.broadcast(`Получили сообщение ${fullText}`);
    fullText = fullText.split(' ');
    let type = fullText[0];
    fullText.splice(0, 1);
    let message = fullText.join(' ');
    player.call('getChatMessage.client', [type, message]);
});

mp.events.add('getChatMessage.server', function (player, type, message) {

    if (message.length > 100) {
        message = message.slice(0, 100);
    };

    if (message[0] == '/') {
        let args = message.split(' ');
        let command = args[0];
        args.splice(0, 1);
        mp.events.call(command, player, args);

    } else {

        switch (type) {
            case 0: {
                if (player.isBroadcasting) {
                    mp.players.forEach((currentPlayer) => {
                            currentPlayer.call('playerBroadcast.client', [player.info.mainInfo.nickname, player.id, message]);
                    });
                    break;
                } else {
                    mp.events.call('playerSaySomething.server', player, message);
                }
                break;
            }
            case 1: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/s', player, message);
                break;
            }
            case 2: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/r', player, message);
                break;
            }
            case 3: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/n', player, message);
                break;
            }
            case 4: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/me', player, message);
                break;
            }
            case 5: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/do', player, message);
                break;
            }
            case 6: {
                mp.players.broadcast(`Получили на сервер ${type} ${message}`);
                mp.events.call('/try', player, message);
                break;
            }
        }
    }
});

mp.events.add('playerSaySomething.server', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);

    mp.players.forEachInRange(player.position, 10, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerSaySomething.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/s', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);

    mp.players.forEachInRange(player.position, 20, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerShout.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/r', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);

    mp.players.forEach((currentPlayer) => {
        if (true) {
            currentPlayer.call('playerWalkieTalkie.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/n', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);

    mp.players.forEachInRange(player.position, 10, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerNonrpMessage.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/me', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);
    mp.players.forEachInRange(player.position, 10, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerMeAction.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/do', function (player, message) {

    mp.players.broadcast(`Передаем на клиент ${message}`);

    mp.players.forEachInRange(player.position, 10, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerDoAction.client', [player.info.mainInfo.nickname, player.id, message]);
        };
    });
});

mp.events.add('/gnews', function (player, message) {

    mp.players.forEach((currentPlayer) => {
        currentPlayer.call('playerGnews.client', [player.info.mainInfo.nickname, player.id, message]);
    });
});

mp.events.add('/try', function (player, message) {
    mp.players.broadcast(`Передаем на клиент ${message}`);

    let result = false;

    if (Math.random() > 0.5) result = true;

    mp.players.forEachInRange(player.position, 10, (currentPlayer) => {
        if (currentPlayer.dimension == player.dimension) {
            currentPlayer.call('playerTryAction.client', [player.info.mainInfo.nickname, player.id, message, result]);
        };
    });
});


