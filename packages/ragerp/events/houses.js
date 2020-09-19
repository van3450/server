"use strict";
let houses = require('../config').houses;
let db = require("../db/db");
let getRand = require("../systems/systems").getRand;

(function () {
    //В бд хранится как {id, владелец(_id), время когда будет взиматься плата}
    db.findHouse({}, function (ans) {
        if (ans[0] != null) {
            for (let i = 0; i < houses.length; i++) {
                for (let j = 0; j < ans.length; j++) {
                    if (houses[i].id == ans[j].id) {
                        houses[i].owner = ans[j].owner;
                        houses[i].date = ans[j].date;
                        houses[i].closed = ans[j].closed;

                        if (houses[i].owner != null) {
                            if (houses[i].date.getTime() - new Date().getTime() > 1000) {
                                houses[i].timer = setTimeout(dropHouse, houses[i].date.getTime() - new Date().getTime(), i);
                            }
                            else {
                                dropHouse(i);
                            }
                        }
                        else {
                            houses[i].owner = null;
                        }
                    }
                }
            }
            console.log("[OK] Houses loaded");
            mp.events.call('setHouses.server');
        }
        else {
            let templatedate = new Date();
            let housesToDB = new Array();
            for (let i = 0; i < houses.length; i++) {
                houses[i].owner = null;
                houses[i].date = templatedate;
                houses[i].closed = false;
                housesToDB.push({
                    id: houses[i].id,
                    owner: houses[i].owner,
                    date: houses[i].date,
                    closed: houses[i].closed
                });
            }
            db.insertHouse(housesToDB, function(ans) {
                console.log("[OK] Houses loaded");
                mp.events.call('setHouses.server');
            });
        }
    });
})();

mp.events.add('setHouses.server', () => {
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].interior == 3) continue;
        switch(houses[i].interior) {
            case 0:
            houses[i].pos = [151.79161071777344, -1005.8930053710938, -98.99993133544922];
            houses[i].posRot = 0;
            houses[i].exit = [151.32838439941406, -1008.0084838867188, -99.00001525878906];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Эконом";
            houses[i].numRooms = 1;
            houses[i].garage = false;
            houses[i].carPlaces = 1;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];
            break;
            case 1:
            houses[i].pos = [265.9971008300781, -1003.5687866210938, -99.0086898803711];
            houses[i].posRot = 0;
            houses[i].exit = [266.2103576660156, -1007.6090087890625, -101.00859832763672];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Комфорт";
            houses[i].numRooms = 2;
            houses[i].garage = true;
            houses[i].carPlaces = 3;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];

            break;
            case 2:
            houses[i].pos = [346.7181701660156, -1006.9768676757812, -99.19622039794922];
            houses[i].posRot = 0;
            houses[i].exit = [346.5464782714844, -1013.1437377929688, -99.19622039794922];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Комфорт +";
            houses[i].numRooms = 2;
            houses[i].garage = true;
            houses[i].carPlaces = 3;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];
            break;
            case 3:
            //M
            //not ready
            houses[i].pos = [347.2686, -999.2955, -99.19622];
            houses[i].posRot = 0;
            houses[i].exit = [346.55215, -1004.01825, -99.19616];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Особняк";
            houses[i].numRooms = 6;
            houses[i].garage = true;
            houses[i].carPlaces = 11;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];
            break;
            case 4:
            //F
            houses[i].pos = [-14.640700340270996, -1438.7071533203125, 31.10153579711914];
            houses[i].posRot = 0;
            houses[i].exit = [-14.28647232055664, -1440.8328857421875, 31.101531982421875];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Высокий";
            houses[i].numRooms = 4;
            houses[i].garage = true;
            houses[i].carPlaces = 7;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];
            break;
            case 5:
            houses[i].pos = [-1905.10693359375, -573.3151245117188, 19.097217559814453];
            houses[i].posRot = 120;
            houses[i].exit = [-1901.960205078125, -572.3373413085938, 19.09721565246582];
            houses[i].dimension = houses[i].id;
            houses[i].class = "Элитный";
            houses[i].numRooms = 1;
            houses[i].garage = true;
            houses[i].carPlaces = 7;
            houses[i].rent = 0.005 * houses[i].price;
            houses[i].garagePos = [236.79916381835938, -1004.5960693359375, -98.99995422363281];
            houses[i].garagePosRot = 90;
            houses[i].garageExit = [ 240.5832061767578, -1004.6981811523438, -98.99994659423828];
        break;
            default:
            continue;
        }
        
        let housesCol = mp.colshapes.newTube(houses[i].pickup[0], houses[i].pickup[1], houses[i].pickup[2], 2.0, 1.0, 0);
        housesCol.setVariable('type', ['house', i]);
        let housesExitCol = mp.colshapes.newSphere(houses[i].exit[0], houses[i].exit[1], houses[i].exit[2], 1.0, houses[i].dimension);
        housesExitCol.setVariable('type', ['houseExit', i]);

        let housesExitGarageCol = mp.colshapes.newSphere(houses[i].garageExit[0], houses[i].garageExit[1], houses[i].garageExit[2], 1.0, houses[i].dimension);
        housesExitGarageCol.setVariable('type', ['houseExit', i]);

        mp.markers.new(2, new mp.Vector3(houses[i].pickup[0], houses[i].pickup[1], houses[i].pickup[2]), 0.75, {
            rotation: new mp.Vector3(0, 180, 0),
            dimension: 0
        });
        mp.markers.new(2, new mp.Vector3(houses[i].exit[0], houses[i].exit[1], houses[i].exit[2]), 0.75, {
            rotation: new mp.Vector3(0, 180, 0),
            dimension: houses[i].dimension
        });
        mp.markers.new(2, new mp.Vector3(houses[i].garageExit[0], houses[i].garageExit[1], houses[i].garageExit[2]), 0.75, {
            rotation: new mp.Vector3(0, 180, 0),
            dimension: houses[i].dimension
        });

        let houseBlipColor;
        if (houses[i].owner == null) {
            houseBlipColor = 2;
        }
        else {
            houseBlipColor = 1;
        }
        houses[i].blip = mp.blips.new(40, new mp.Vector3(houses[i].pickup[0], houses[i].pickup[1], houses[i].pickup[2]),
        {
            shortRange: true,
            dimension: 0,
            color: houseBlipColor
        });

        houses[i].name = houses[i].id;
    }
});


//2 - гос; 1 - куплено
let changeBlip = function (index) {
    if (houses[index].blip == null) return;
    if (houses[index].owner != null) {
        houses[index].blip.color = 1;
    }
    else {
        houses[index].blip.color = 2;
    }
};

var updateHouse = function (index, result) {
    let condition = {id: houses[index].id}
    let data = { $set: {owner: houses[index].owner, date: houses[index].date, closed: houses[index].closed}};
    db.updateHouse([{condition: condition, data: data}], function() {
        result();
    });
};

let dropHouse = function (index) {
    if (houses[index].owner == null) return;
    let ownerId = houses[index].owner.id;
    houses[index].owner = null;
    updateHouse(index, function() {
        for (let i = 0; i < mp.players.length; i++) {
            if (ownerId == mp.players.at(i).info.personId) {
                mp.players.at(i).call('removeApp.client', ["house", index]);
                i = mp.players.length;
            }
        }

        console.log("[info] House dropped " + index);
    });
    changeBlip(index);
};


//После оплаты налогов за биз выбрать событие(в далнейшем возможно заменить index на id дома)
mp.events.add('updateHouseTimer.server', (index, numDays) => {
    clearTimeout(houses[index].timer);
    houses[index].date.setDate(houses[index].date.getDate() + numDays);
    houses[index].timer = setTimeout(dropHouse, houses[index].date.getTime() - new Date().getTime(), index);
    updateHouse(index, function() {
        console.log("[info] House updated " + index);
    });
});

//Вызывать в случае смены никнейма персоонажа
mp.events.add('updateNick.server', (player) => {
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].owner != null) {
            if (houses[i].owner.id = player.info.personId) {
                houses[i].owner.nick = player.info.mainInfo.nickname;
                updateHouse(i, function() {
                    console.log("[info] House updated " + i);
                });
            }
        }
    }
});

//Открыть меню входа в дом
mp.events.add('enterHouseMenu.server', (player, currentHouse) => {
    if (houses[currentHouse].owner == null) {
        player.call('enterHouseMenuAns.client',[{
            name: houses[currentHouse].name,
            class: houses[currentHouse].class,
            numRooms: houses[currentHouse].numRooms,
            garage: houses[currentHouse].garage,
            carPlaces: houses[currentHouse].carPlaces,
            rent: houses[currentHouse].rent,
            price: houses[currentHouse].price,
            pos: houses[currentHouse].pickup
        }]);
    }
    else {
        player.call('enterHouseMenuAns.client',[{
            name: houses[currentHouse].name,
            class: houses[currentHouse].class,
            numRooms: houses[currentHouse].numRooms,
            garage: houses[currentHouse].garage,
            carPlaces: houses[currentHouse].carPlaces,
            rent: houses[currentHouse].rent,
            owner: houses[currentHouse].owner.nick,
            pos: houses[currentHouse].pickup
        }]);
    }
});

mp.events.add('enterHouse.server', (player, currentHouse) => {
    if (houses[currentHouse].owner == null) {
        player.call('enterHouseAns.client', [new mp.Vector3(houses[currentHouse].pos[0], houses[currentHouse].pos[1], houses[currentHouse].pos[2]), houses[currentHouse].posRot]);
        player.dimension = houses[currentHouse].dimension;
    }
    else {
        if (houses[currentHouse].closed == false) {
            player.call('enterHouseAns.client', [new mp.Vector3(houses[currentHouse].pos[0], houses[currentHouse].pos[1], houses[currentHouse].pos[2]), houses[currentHouse].posRot]);
            player.dimension = houses[currentHouse].dimension;
        }
        else {
            if (player.info.personId == houses[currentHouse].owner.id) {
                player.call('enterHouseAns.client', [new mp.Vector3(houses[currentHouse].pos[0], houses[currentHouse].pos[1], houses[currentHouse].pos[2]), houses[currentHouse].posRot]);
                player.dimension = houses[currentHouse].dimension;
            }
            else {
                player.call('enterHouseAns.client', [null]);
            }
        }
    }
});

mp.events.add('enterGarage.server', (player, currentHouse) => {
    if (houses[currentHouse].owner == null) {
        player.call('enterGarageAns.client', [new mp.Vector3(houses[currentHouse].garagePos[0], houses[currentHouse].garagePos[1], houses[currentHouse].garagePos[2]), houses[currentHouse].garagePosRot]);
        player.dimension = houses[currentHouse].dimension;
    }
    else {
        if (houses[currentHouse].closed == false) {
            player.call('enterGarageAns.client', [new mp.Vector3(houses[currentHouse].garagePos[0], houses[currentHouse].garagePos[1], houses[currentHouse].garagePos[2]), houses[currentHouse].garagePosRot]);
            player.dimension = houses[currentHouse].dimension;
        }
        else {
            if (player.info.personId == houses[currentHouse].owner.id) {
                player.call('enterGarageAns.client', [new mp.Vector3(houses[currentHouse].garagePos[0], houses[currentHouse].garagePos[1], houses[currentHouse].garagePos[2]), houses[currentHouse].garagePosRot]);
                player.dimension = houses[currentHouse].dimension;
            }
            else {
                player.call('enterGarageAns.client', [null]);
            }
        }
    }
});

mp.events.add('exitHouse.server', (player, currentHouse) => {
    player.position = new mp.Vector3(houses[currentHouse].spawn[0], houses[currentHouse].spawn[1], houses[currentHouse].spawn[2]);
    player.dimension = 0;
    player.call('exitHouseAns.client', [houses[currentHouse].angle]);
});

mp.events.add('buyHouse.server', (player, currentHouse) => {
    if (currentHouse != null) {
        if ( houses[currentHouse].owner == null) {
            if (player.info.inventory.bank.cash >= houses[currentHouse].price) {
                player.info.inventory.bank.cash -= houses[currentHouse].price;
                let condition = {_id: player.info.personId, number: player.info.number};
                let data = { $set: player.info.getWithoutNumber() };
                db.updatePlayersInfo([{condition: condition, data: data}], (result) => {
                    if (result) {
                        player.call('setMoney.client', [player.info.inventory.bank.cash]);
                        houses[currentHouse].owner = {};
                        houses[currentHouse].owner.id = player.info.personId;
                        houses[currentHouse].owner.nick = player.info.mainInfo.nickname;

                        let dateForClose = new Date();
                        dateForClose.setHours(0);
                        dateForClose.setDate(dateForClose.getDate() + 1);
                        dateForClose.setHours(getRand(0, 24));
                        dateForClose.setMinutes(0);
                        dateForClose.setSeconds(0);
                        houses[currentHouse].date = dateForClose;

                        updateHouse(currentHouse, function() {
                            player.call('buyHouseAns.client', [1, {
                                name: houses[currentHouse].name,
                                class: houses[currentHouse].class,
                                numRooms: houses[currentHouse].numRooms,
                                garage: houses[currentHouse].garage,
                                carPlaces: houses[currentHouse].carPlaces,
                                rent: houses[currentHouse].rent,
                                owner: houses[currentHouse].owner.nick,
                                price: houses[currentHouse].price,
                                pos: houses[currentHouse].pickup
                            }]);

                            let houseInfo = {
                                name: houses[currentHouse].id,
                                class: houses[currentHouse].class,
                                numRooms: houses[currentHouse].numRooms,
                                garage: houses[currentHouse].garage,
                                carPlaces: houses[currentHouse].carPlaces,
                                rent: houses[currentHouse].rent,
                                isOpened: houses[currentHouse].closed,
                                improvements: new Array(),
                                price: houses[currentHouse].price,
                                days: parseInt((houses[currentHouse].date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)),
                                pos: houses[currentHouse].pickup
                            };
                            player.call('addApp.client', ["house", houseInfo]);

                            console.log("[info] House buyed and saved: " + currentHouse);
                        });

                        houses[currentHouse].timer = setTimeout(dropHouse, houses[currentHouse].date.getTime() - new Date().getTime(), currentHouse);
                        changeBlip(currentHouse);
                    }
                    else{
                        player.call('buyHouseAns.client', [0, {
                            name: houses[currentHouse].name,
                            class: houses[currentHouse].class,
                            numRooms: houses[currentHouse].numRooms,
                            garage: houses[currentHouse].garage,
                            carPlaces: houses[currentHouse].carPlaces,
                            rent: houses[currentHouse].rent,
                            price: houses[currentHouse].price,
                            pos: houses[currentHouse].pickup
                        }]);
                    }
                });

            }
            else {
                player.call('buyHouseAns.client', [0, {
                    name: houses[currentHouse].name,
                    class: houses[currentHouse].class,
                    numRooms: houses[currentHouse].numRooms,
                    garage: houses[currentHouse].garage,
                    carPlaces: houses[currentHouse].carPlaces,
                    rent: houses[currentHouse].rent,
                    price: houses[currentHouse].price,
                    pos: houses[currentHouse].pickup
                }]);
            }
        }
        else {
            player.call('buyHouseAns.client', [0, {
                name: houses[currentHouse].name,
                class: houses[currentHouse].class,
                numRooms: houses[currentHouse].numRooms,
                garage: houses[currentHouse].garage,
                carPlaces: houses[currentHouse].carPlaces,
                rent: houses[currentHouse].rent,
                owner: houses[currentHouse].owner.nick,
                pos: houses[currentHouse].pickup
            }]);
        }
    }
});

mp.events.add('lockHouse.server', (player, id, closed) => {
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].id != id) continue;
        if(houses[i].owner != null) {
            if (player.info.personId == houses[i].owner.id) {
                houses[i].closed = closed;
            }
        }
    }
});

mp.events.add('govSellHouse.server', (player, id) => {
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].id != id) continue;
        if(houses[i].owner != null) {
            if (player.info.personId == houses[i].owner.id) {
                houses[i].owner = null;
                updateHouse(i, function() {
                    changeBlip(i);
                    player.call('govSellHouseAns.client', [1]);
                    console.log("[info] House selled to gov " + i);
                    return;
                });
            }
            else {
                player.call('govSellHouseAns.client', [0]);
                return;
            }
        }
        else {
            player.call('govSellHouseAns.client', [0]);
            return;
        }
    }
});

mp.events.add('sellHouse.server', (player, currentHouse, playerId, cost) => {
    if(houses[currentHouse].owner != null) {
        
    }
    else {
        player.call('sellHouseAns.client', [0]);
    }
});