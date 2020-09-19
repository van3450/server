var currentBusBlip;
//currentBusBlip.isDestroyed = false;

mp.events.add('createBusCheckpoint.client', (checkpointIndex, checkpoint) => {
    if (!checkpoint.type) {
        let newCheckpoint = mp.checkpoints.new(5, new mp.Vector3(checkpoint.vector[0], checkpoint.vector[1], checkpoint.vector[2] - 3), 10,
            {
                direction: new mp.Vector3(checkpoint.vector[0], checkpoint.vector[1], checkpoint.vector[2]),
                color: [255, 246, 0, 255],
                visible: true,
                dimension: 0
            });
        newCheckpoint.isBusCheckpoint = true;
        newCheckpoint.checkpointIndex = checkpointIndex;
        createBusBlip(checkpoint.vector, 'check');

    } else {
        let newCheckpoint = mp.checkpoints.new(5, new mp.Vector3(checkpoint.vector[0], checkpoint.vector[1], checkpoint.vector[2] - 3), 10,
            {
                direction: new mp.Vector3(checkpoint.vector[0], checkpoint.vector[1], checkpoint.vector[2]),
                color: [30, 206, 255, 255],
                visible: true,
                dimension: 0
            });
        newCheckpoint.isBusCheckpoint = true;
        newCheckpoint.checkpointIndex = checkpointIndex;
        newCheckpoint.isBusStop = true;
        createBusBlip(checkpoint.vector, 'stop');
    }
});

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
    if (!mp.players.local.vehicle || mp.players.local.vehicle.model != 2222034228) {
        mp.events.call('showNotification.client', 'Ошибка', true, 1, 222, [77, 77, 77, 200]);
        return;
    }
    if (checkpoint.isBusCheckpoint) {
        let checkpointIndex = checkpoint.checkpointIndex;
        checkpoint.destroy();
        currentBusBlip.destroy();
        currentBusBlip.isDestroyed = true;
        if (checkpoint.isBusStop) {
            mp.events.callRemote('playerGotBusCheckpoint.server', 'stop', checkpointIndex);
        } else {
            mp.events.callRemote('playerGotBusCheckpoint.server', 'check', checkpointIndex);
        }

    }
});

mp.events.add("destroyBusCheckpoints.client", () => {
    if (!currentBusBlip.isDestroyed) currentBusBlip.destroy();
    mp.checkpoints.forEach((checkpoint) => {
        if (checkpoint.isBusCheckpoint == true) {
            checkpoint.destroy();
        }
    });
});

mp.events.add("showBusDriverText.client", (route) => {
    mp.events.call('pushChatMessage.client', `!{#fff589}Автобус по маршруту !{#8ef0ff}${route} !{#fff589}отправляется через 20 секунд`);
});

function createBusBlip(vector, type) {
    if (type == 'check') {
        currentBusBlip = mp.blips.new(1, new mp.Vector3(vector[0], vector[1], vector[2]),
            {
                color: 5,
                shortRange: false
            });
    } else {
        currentBusBlip = mp.blips.new(1, new mp.Vector3(vector[0], vector[1], vector[2]),
            {
                color: 3,
                shortRange: false
            });
    }
    currentBusBlip.setRoute(true);
    currentBusBlip.isDestroyed = false;
}
