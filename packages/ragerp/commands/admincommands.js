"use strict";

let houses = require('../config/houses');
let biz = require('../config/biz');
let world = require('../players/world');
let vehicles = require('../vehicle-system/spawn');

const acmd = [
    {
        lvl: 1,
        commands: "/ahelp /a /ans /admins"
    },
    {
        lvl: 2,
        commands: "/kick"
    },
    {
        lvl: 3,
        commands: "/goto"
    },
    {
        lvl: 4,
        commands: "/msg /gethere /hp /setd"
    },
    {
        lvl: 5,
        commands: "/weather"
    }
]


mp.events.add('/getpos', function (player, args) { 
    
    player.call('pushChatMessage.client', [`${player.position.x} ${player.position.y} ${player.position.z}`])

});

mp.events.add('/ahelp', function (player, args) {
    let playerAdminLvl = 5;

    acmd.forEach(function (current) {
        if (current.lvl <= playerAdminLvl) {
            player.call('showAdminCommands.client', [current.lvl, current.commands]);
        }
    });
});

mp.events.add('/admins', function (player, args) {
    let playerAdminLvl = 4;
    let admins = [];
    mp.players.forEach((currentPlayer) => {
        if (true) {
            admins.push({
                lvl: playerAdminLvl,
                id: currentPlayer.id,
                nickname: currentPlayer.info.mainInfo.nickname
            });
        }
    });
    player.call('showAdminList.client', [admins]);
});


mp.events.add('/ans', function (player, args) { // /ans [target] [message]
    if (!args[0] || !args[1]) {
        mp.players.broadcast('error');
    } else {
        let target = mp.players.at(args[0]);
        if (!target) {
            mp.players.broadcast('Игрок не найден');
            return;
        }
        args.splice(0, 1);
        target.call('getAnswerMessage.client', [player.info.mainInfo.nickname, player.id, args]);
        mp.players.forEach((currentPlayer) => {
            if (true) {
                currentPlayer.call('adminAnswer.client', [player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id, args]);
            };
        });
    }
});
;
mp.events.add('/a', function (player, args) {
   

    mp.players.forEach((currentPlayer) => {
        if (true) {
            currentPlayer.call('adminChat.client', [player.info.mainInfo.nickname, player.id, args]);
        };
    });
});

mp.events.add('/msg', function (player, args) {
    mp.players.forEach((currentPlayer) => {
        currentPlayer.call('msgChat.client', [player.info.mainInfo.nickname, player.id, args]);
    });
});

mp.events.add('/kick', function (player, args) { // /kick [target] [message]
    if (!args[0] || !args[1]) {
        mp.players.broadcast('error');
    } else {
        let target = mp.players.at(args[0]);
        if (!target) {
            player.call('showErrorMessage.client', ['Игрок не найден'])
            return;
        }
        args.splice(0, 1);
        try {
            target.call('kickMessage.client', [player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id, args]);
            target.call('showClosedConnection.client');
            target.kick('Kicked');
            mp.players.forEach((currentPlayer) => {
                currentPlayer.call('kickMessage.client', [player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id, args]);
            });
        }
        catch (err) {
            player.call('showErrorMessage.client', ['Игрок отключился от сервера'])
            console.log(err);
        }
    }
});

mp.events.add('/goto', function (player, args) { // /goto [target]
    if (!args[0]) {
        mp.players.broadcast('error');
    } else {
        let target = mp.players.at(args[0]);
        if (!target) {
            player.call('showErrorMessage.client', ['Игрок не найден'])
            return;
        }
        try {
            player.position = new mp.Vector3(target.position.x + 2, target.position.y, target.position.z);
            mp.players.forEach((currentPlayer) => {
                if (true) {
                    currentPlayer.call('adminChatAction.client', ['телепортировался к игроку', player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id]);
                }
            })
        }
        catch (err) {
            player.call('showErrorMessage.client', ['Игрок отключился от сервера'])
            console.log(err);
        }
    }
});

mp.events.add('/gethere', function (player, args) { // /gethere [target]
    if (!args[0]) {
        mp.players.broadcast('error');
    } else {
        let target = mp.players.at(args[0]);
        if (!target) {
            player.call('showErrorMessage.client', ['Игрок не найден'])
            return;
        }
        try {
            target.position = new mp.Vector3(player.position.x + 2, player.position.y, player.position.z);
            mp.players.forEach((currentPlayer) => {
                if (true) {
                    currentPlayer.call('adminChatAction.client', ['телепортировал к себе игрока', player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id]);
                }
            });
        }
        catch (err) {
            player.call('showErrorMessage.client', ['Игрок отключился от сервера']);
            console.log(err);
        }
    }
});


mp.events.add('/hp', function (player, args) { // /hp [target] [hp]
    if (!args[0] || !args[1]) {
        mp.players.broadcast('error');
    } else {
        let target = mp.players.at(args[0]);
        if (!target) {
            player.call('showErrorMessage.client', ['Игрок не найден'])
            return;
        }
        try {
            target.health = parseInt(args[1], 10);
            mp.players.forEach((currentPlayer) => {
                if (true) {
                    currentPlayer.call('adminChatAction.client', ['изменил здоровье игроку', player.info.mainInfo.nickname, player.id, target.info.mainInfo.nickname, target.id]);
                }
            });
        }
        catch (err) {
            player.call('showErrorMessage.client', ['Игрок отключился от сервера'])
            console.log(err);
        }
    }
});


mp.events.add('/setd', function (player, args) { // /hp [target] [hp]
    if (!args[0]) {
        mp.players.broadcast('error');
    } else {
        try {
          player.dimension = parseInt(args[1], 10);
          player.call('pushChatMessage.client', ['!{ffffff}Вы переместились в другое измерение'])
        }
        catch (err) {
            console.log(err);
        }
    }
});


mp.events.add('/house', function (player, args) { // /house [id]
    if (!args[0]) {
        mp.players.broadcast('error');
    } else {
        let target = houses[args[0]-1];
        if (!target) {
            player.call('showErrorMessage.client', ['Дом не найден'])
            return;
        }
        try {
            player.position = new mp.Vector3(target.pickup);
        }
        catch (err) {
            console.log(err);
        }
    }
});

mp.events.add('/biz', function (player, args) { // /biz [id]
    if (!args[0]) {
        mp.players.broadcast('error');
    } else {
        let target = biz[args[0]];
        if (!target) {
            player.call('showErrorMessage.client', ['Бизнес не найден'])
            return;
        }
        try {
            player.position = new mp.Vector3(target.pos);
        }
        catch (err) {
            console.log(err);
        }
    }
});

mp.events.add('/tpos', function (player, args) { 
    player.position = new mp.Vector3(parseFloat(args[0]), parseFloat(args[1]), parseFloat(args[2]));
});

mp.events.add('/gr', function (player, args) { 
    player.position = new mp.Vector3(-1055.51, -242.75, 44.02);
});


mp.events.add('/veh', (player, args) => {
    let vehicle = vehicles.spawnVehicle(mp.joaat(args[0]), "ADMIN", [player.position.x, player.position.y, player.position.z], player.heading, parseInt(args[1], 10),parseInt(args[2], 10));
    player.putIntoVehicle(vehicle, -1);
});


mp.events.add('/getrot', (player) => {
    player.call('getRot.client');
});

mp.events.add('/pd', (player) => {
    player.call('payDayMessage.client');
});

mp.events.add('/weather', function (player, args) { 
    mp.world.setWeatherTransition(world.WEATHER_LIST[args[0]]);
    mp.players.forEach((currentPlayer) => {
        currentPlayer.call('pushChatMessage.client', [`Установили погоду номер ${args[0]} - ${world.WEATHER_LIST[args[0]]}`]);
    });
});