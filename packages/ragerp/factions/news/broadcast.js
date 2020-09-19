var broadcastState = false;

var broadcastColshape = mp.colshapes.newSphere(-1055.51, -242.75, 44.02, 3, 0);
broadcastColshape.setVariable('type', 'newsBroadcast');

var broadcastLabel = mp.labels.new("~g~Эфир свободен\n~w~Нажмите ~b~E ~w~\nдля выхода в эфир", new mp.Vector3(-1055.51, -242.75, 44.02),
    {
        los: true,
        font: 0,
        drawDistance: 15,
    });

var bestDjs = mp.labels.new("~g~Редактор недели:\n~w~Immanuelkaso Immanuelkaso\n~b~(1555 объявлений)", new mp.Vector3(-1079, -244, 37.7),
    {
        los: true,
        font: 0,
        drawDistance: 10,
    });

mp.events.add('/toggle', (player) => {
    if (broadcastColshape.isPointWithin(player.position)) {
        if (!broadcastState && !player.isBroadcasting) {
            mp.events.call('playerBroadcasting.server', player, true);
        } else if (broadcastState && player.isBroadcasting) {
            mp.events.call('playerBroadcasting.server', player, false);
        }
    }
});

mp.events.add('playerBroadcasting.server', (player, state) => {
    if (state) {
        broadcastState = true;
        mp.events.call('updateBroadcastLabel.server', player, broadcastState);
        player.isBroadcasting = true;
        player.setVariable('isBroadcasting', true);
        player.setProp(0, 19, 0);
        //уведомляем сотрудников
    } else {
        broadcastState = false;
        mp.events.call('updateBroadcastLabel.server', player, broadcastState);
        player.isBroadcasting = false;
        player.setVariable('isBroadcasting', false);
        //уведомляем сотрудников
    }
});
   
mp.events.add('updateBroadcastLabel.server', (player, state) => {
    if (state) {
        broadcastLabel.text = `~y~Эфир занят\nВедущий: ~g~${player.info.mainInfo.nickname}`;
    } else {
        broadcastLabel.text = "~g~Эфир свободен\n~w~Нажмите ~b~E ~w~\nдля выхода в эфир";
    }
   
})
