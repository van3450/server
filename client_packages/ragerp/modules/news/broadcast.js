require('./ragerp/modules/stuff/notifications.js');
mp.events.add('playerExitColshape', (shape) => {
    if (shape.getVariable('type') == 'newsBroadcast') {
        if (mp.players.local.getVariable('isBroadcasting')) {
            mp.events.callRemote('playerBroadcasting.server', false);
            mp.game.ui.notifications.show("Вы покинули эфир", false, 15, 20);
        }
    }
});
