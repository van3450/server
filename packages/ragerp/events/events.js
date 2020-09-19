"use strict";
const spawnPoints = require('../config/').spawnPoints;
const doors = require('../config').doors;

let PlayerInfo = require("../players/playerInfo").Player;
let db = require("./../db/db.js");
let clothes = require("../players/clothes").clothes;

mp.events.add('playerDeath', player => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
});

mp.events.add('playerJoin', player => {
    player.auth ={};
    player.reg = {};
    player.auth.times = 0;
    player.reg.times = 0;
    player.info = new PlayerInfo();
    player.info.ip = player.ip;
    player.info.serial = player.serial;
    player.info.socialClub = player.socialClub;
    player.dimension = player.id + 1;
    player.call('playerJoin.client', []);
});

mp.events.add('playerJoined.server', player => {
    player.call('setClothes.client', [clothes.getForShop()]);
    player.call('setDoors.client', [doors]);

    //передавать нужную инфо о персоонажах
    let charInfos = new Array();
    for(let i = 0; i < player.charactersInfo.length; i++) {
        if (!player.charactersInfo[i].mainInfo.created) {
            i = player.charactersInfo.length;
            continue;
        }
        charInfos.push({customizations: player.charactersInfo[i].customization.data, charClothes: player.charactersInfo[i].inventory.usedObjects.getPlayerClothes()});
    }
    player.call('playerJoined.client', [charInfos]);
});

mp.events.add('charChoosed.server', player => {
    player.call('charChoosed.client');
    mp.events.call('updateNick.server', player);
    player.dimension = 0;
    player.info.charChoosed = true;
    console.log(player.info.inventory.bank.cash);
    player.call('setMoney.client', [player.info.inventory.bank.cash]);
    player.setVariable('name', player.info.mainInfo.nickname);
});

mp.events.add('playerQuit', player => {
    if (player.info != null) {
        if (player.info.auth == true) {
            let condition = {_id: player.info.personId, number: player.info.number};
            let data = { $set: player.info.get()};
            db.updatePlayersInfo([{condition: condition, data: data}], function () {
                player.info = null;
            });
        }
    }
});

mp.events.add('updateNick.server', player => {
    player.call('discord.client', [player.info.mainInfo.nickname]);
});

mp.events.add('saveAll', () => {
    console.log("Save all players started");
    let objForSave = new Array();
    for(let i = 0; i < mp.players.length; i++) {
        if(mp.players[i].info == null) continue;
        let condition = {_id: mp.players[i].info.personId, number: mp.players[i].info.number}
        let data = { $set: mp.players[i].info.getWithoutNumber()};
        objForSave.push({condition: condition, data: data});
    }
    db.updatePlayersInfo(objForSave, function () {
        console.log("Save all players ended");
    });
});

//Для отладки
mp.events.add('console', (player, text) => {
    console.log("From client: " + text);
});