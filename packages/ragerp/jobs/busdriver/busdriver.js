"use strict";
var vehicles = require('../../vehicle-system/spawn.js');
var routes = require('./routes.json');

    mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {

        if (vehicle.key == "BUS") {
            if (seat == -1) {
                player.call('pushChatMessage.client', ['Вы сели в автобус водителем. Введите /start [маршрут] [цена] для начала работы.']);
            } else if (vehicle.isActive) {
                player.call('pushChatMessage.client', [`Вы сели в автобус пассажиром. Цена проезда: $${vehicle.busPrice}`]);
            }
        }     
    }); //доделать


mp.events.add('/start', (player, args) => {
    mp.events.call('startBusDriverWork.server', player, args[0], args[1]);
});

mp.events.add('startBusDriverWork.server', (player, route, price) => {

    if (player.vehicle) {
        if (player.vehicle.key != "BUS" || player.vehicle.isActive || player.currentBusRoute) {
            player.call('showNotification.client', ['Ошибка', true, 1, 222, [77, 77, 77, 200]]);
            return;
        }
        player.jobPayday = 0;
        player.vehicle.isActive = true;
        player.vehicle.busPrice = price;
        player.currentBusRoute = route;
        player.currentBusCheckpoint = 0;
        player.busId = player.vehicle.id;
        
        let label = {
            "type": "bus",
            "route": routes[player.currentBusRoute].name,
            "price": player.vehicle.busPrice
        }
        mp.events.call('createSyncedLabel.server', player, player.vehicle, label);
        player.call('pushChatMessage.client', [`Поставили цену за проезд: ${player.vehicle.busPrice}`]);
        player.call('pushChatMessage.client', [`Поставили цену за проезд: ${player.vehicle.busPrice}`]);
        // mp.events.call('createBusDriverRoute.server', player, routes[route]);
        player.call('createBusCheckpoint.client', [player.currentBusCheckpoint, routes[player.currentBusRoute].points[player.currentBusCheckpoint]]);
    }
});

mp.events.add('playerGotBusCheckpoint.server', (player, type, checkpointIndex) => {
    player.jobPayday +=10;
    if (!player.vehicle) {
        player.call('showNotification.client', ['Нужно находиться в т/с', true, 1, 222, [77, 77, 77, 200]]);
        return;
    }
    if (player.currentBusCheckpoint != checkpointIndex || player.vehicle.id != player.busId) {
        player.call('showNotification.client', ['Ошибка', true, 1, 222, [77, 77, 77, 200]]);
        return;
    }
    player.call('pushChatMessage.client', [`Заработали: $${player.jobPayday}`]);
    if (type == 'stop') {
        mp.players.forEachInRange(player.position, 10, 0, (currentPlayer) => {
            currentPlayer.call('showBusDriverText.client', [routes[player.currentBusRoute].name]);
        });
        setTimeout(() => {
            createNextCheckpoint(player);
            player.call('showNotification.client', ['Продолжайте движение', true, 1, 185, [255, 255, 255, 200]]);
        }, 20000);
        player.call('showNotification.client', ['Остановка. Ожидайте пассажиров.', true, 1, 26, [255, 255, 255, 200]]);
        return;
    } else {
        createNextCheckpoint(player);
    }
});

mp.events.add('playerEndBusDriverWork.server', (player) => {
    player.jobPayday = 0;
    player.currentBusRoute = null;
    player.currentBusCheckpoint = null;
    player.busId = null;
    player.call('destroyBusCheckpoints.client');
});

function createNextCheckpoint(player) {
    if (player.currentBusCheckpoint + 1 == routes[player.currentBusRoute].points.length) {
        player.call('pushChatMessage.client', [`Круг закончен`]);
        player.currentBusCheckpoint = 0;
        player.call('createBusCheckpoint.client', [player.currentBusCheckpoint, routes[player.currentBusRoute].points[player.currentBusCheckpoint]]);
    } else {
        player.currentBusCheckpoint++;
        player.call('createBusCheckpoint.client', [player.currentBusCheckpoint, routes[player.currentBusRoute].points[player.currentBusCheckpoint]]);
    }
}

mp.events.add("playerExitVehicle", (player, vehicle) => {
    if (vehicle.key == "BUS" && player.currentBusRoute && vehicle.id == player.busId) {
        if (player.isExit) return;
        player.call('showNotification.client', ['У вас есть 30 секунд, чтобы вернуться в автобус', true, 1, 6, [255, 255, 255, 200]]);
        player.busLeaveTimer = setTimeout(function() {
        try {
                vehicles.respawnVehicle(vehicle);
                mp.events.call('playerEndBusDriverWork.server', player);
        } catch(err) {
            console.log(err);
        }
      
        }, 30000);
    }
});

mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
    if (vehicle.key == "BUS" && player.currentBusRoute && vehicle.id == player.busId) { //&& seat == -1
        player.call('pushChatMessage.client', [`Вы вернулись в автобус`]);
        clearTimeout(player.busLeaveTimer);
    }
});

mp.events.add("playerQuit", (player, exitType, reason) => {
    player.isExit = true;
    if (player.busLeaveTimer) {
        clearTimeout(player.busLeaveTimer);
        respawnVehicle(mp.vehicles.at(player.busId));
    }
    if (player.vehicle && player.currentBusRoute) {
        if (player.vehicle.key == "BUS" && player.vehicle.id == player.busId) {
            vehicles.respawnVehicle(player.vehicle);
        }
    }

});