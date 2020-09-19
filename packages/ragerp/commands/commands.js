"use strict";
let db = require("../db/db.js");
let PlayerInfo = require("../players/playerInfo").Player;
let clothes = require("../players/clothes").clothes;

mp.events.add('/suicide', player => {
    player.health = 0;
});

mp.events.add('/heal', player =>  {
    player.health = 100;
});

mp.events.add('/armor', player => {
    player.armour = 100;
});

mp.events.add('/noclip', player => {
    player.call('noclip.client');
});



//temp
mp.events.add('/getpos', player => {
    console.log(player.position);
});

//temp
mp.events.add('/getdim', player => {
    console.log(player.dimension);
});

//temp
mp.events.add('/setdim', (player, dimension) => {
    player.dimension = parseInt(dimension);
});


//temp
mp.events.add('/setnick', (player, fullText) => {
    player.info.mainInfo.nickname = fullText;
});

//temp
mp.events.add('/getinfo', (player, fullText) => {
    console.log(player.info);
});

//temp
mp.events.add('/setmoney', (player, fullText) => {
    player.info.inventory.bank.cash = parseInt(fullText);
    let condition = {_id: player.info.personId, number: player.info.number};
    let data = { $set: player.info.getWithoutNumber() };
    db.updatePlayersInfo([{condition: condition, data: data}], (result) => {
        if (result) {
            player.call('setMoney.client', [player.info.inventory.bank.cash]);
        }
    });
});

//temp
mp.events.add('/getinv', (player, fullText) => {
    console.log(player.info.inventory.get());
    console.log(player.info.inventory.getAllUsed());
});

//temp
mp.events.add('/weartest', (player) => {
    player.setClothes(3, 4, 0, 2);
    player.setClothes(8, 26, 0, 2);
    player.setClothes(11, 59, 0, 2);
    player.setClothes(4, 48, 0, 2);
    player.setClothes(6, 21, 0, 2);
});

//temp
mp.events.add('/getnick', (player, fullText) => {
    player.outputChatBox(`${player.info.mainInfo.nickname}`);
});

//temp
mp.events.add('/setc', (player, args) => {
    player.setClothes(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
});

mp.events.add('/saveall', player => {
    mp.events.call('saveAll');
});

//temp
mp.events.add('/setdoor', (player, status) => {
    if (status == '0') {
        player.call('doortest', [false]);
    }
    else {
        player.call('doortest', [true]);
    }
});


//temp
mp.events.add('/getrot', (player) => {
    player.call('getrot');
});

//temp
mp.events.add('/setrot', (player, fullText) => {
    player.call('setrot', [parseInt(fullText)]);
});

//temp
mp.events.add('/getcharinfo', (player) => {
    for (let i = 0; i < player.charactersInfo.length; i++) {
        console.log(player.charactersInfo[i]);
    }
});
