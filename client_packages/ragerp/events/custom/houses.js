"use strict";
let ui = require("./ragerp/browser/index.js");

let currentHouse = null;
let inHouse = false;
let nearHouse = false;

mp.events.add('playerEnterColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'house') {
        currentHouse = shape.getVariable('type')[1];
        mp.events.callRemote('enterHouseMenu.server', currentHouse);
    }

    if (shape.getVariable('type')[0] == 'houseExit') {
        if (inHouse) {
            mp.events.call('exitHouse.client');
        }
    }
});
mp.events.add('playerExitColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'house') {
        if (currentHouse == null) {
            ui.callCEF('closeForm', []);
            mp.gui.cursor.show(false, false);
            mp.players.local.isBusy = false;
        }
        else {
            if (currentHouse == shape.getVariable('type')[1]) {
                ui.callCEF('closeForm', []);
                mp.gui.cursor.show(false, false);
                mp.players.local.isBusy = false;
                if (!inHouse && !nearHouse) {
                    currentHouse = null;
                }
            }
        }
    } 
    
    if (shape.getVariable('type')[0] == 'houseExit') {
        ui.callCEF('closeForm', []);
        mp.gui.cursor.show(false, false);
        mp.players.local.isBusy = false;
    }
});

//меню входа в дом
mp.events.add('enterHouseMenuAns.client', (houseInfo) => {
    if (mp.players.local.isBusy) return;
    mp.gui.cursor.show(true, true);

    houseInfo.area =  mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(houseInfo.pos[0], houseInfo.pos[1], houseInfo.pos[2]));
    ui.callCEF('showHouse', [houseInfo]);
    mp.players.local.isBusy = true;
});

mp.events.add('houseMenuClose.client', () => {
    mp.gui.cursor.show(false, false);
    mp.players.local.isBusy = false;
});

//вход в гараж
mp.events.add('enterGarage.client', () => {
    nearHouse = true;
    mp.events.callRemote('enterGarage.server', currentHouse);
});
mp.events.add('enterGarageAns.client', (pos, rot) => {
    if (pos != null) {
        ui.callCEF('checkGarage', [1]);
        inHouse = true;
        mp.players.local.setHeading(rot);
        mp.players.local.position = pos;
        mp.game.cam.clampGameplayCamYaw(0, 0);
        nearHouse = false;
    }
    else {
        ui.callCEF('checkGarage', [0]);
        inHouse = false;
    }
});

//вход в дом
mp.events.add('enterHouse.client', () => {
    nearHouse = true;
    mp.events.callRemote('enterHouse.server', currentHouse);
});
mp.events.add('enterHouseAns.client', (pos, rot) => {
    if (pos != null) {
        ui.callCEF('checkEnter', [1]);
        inHouse = true;
        mp.players.local.setHeading(rot);
        mp.players.local.position = pos;
        mp.game.cam.clampGameplayCamYaw(0, 0);
        nearHouse = false;
    }
    else {
        ui.callCEF('checkEnter', [0]);
        inHouse = false;
    }
});

//выход из дома
mp.events.add('exitHouse.client', () => {
    mp.events.callRemote('exitHouse.server', currentHouse);
});
mp.events.add('exitHouseAns.client', (rot) => {
    mp.players.local.setHeading(rot);
    mp.game.cam.clampGameplayCamYaw(0, 0);
    inHouse = false;
    currentHouse = null;
});

//выбор в меню купить дом
mp.events.add('buyHouse.client', () => {
    mp.events.callRemote('buyHouse.server', currentHouse);
});
mp.events.add('buyHouseAns.client', (ans, houseInfo) => {
    houseInfo.area =  mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(houseInfo.pos[0], houseInfo.pos[1], houseInfo.pos[2]));
    ui.callCEF('checkHouse', [ans, houseInfo]);
});



// В функции приложении
// --------------------
// name - id дома    status - true = закрыт
mp.events.add('lockHouse.client', (name, status) => {
    mp.events.callRemote('lockHouse.server', name. status);
});

// name - id дома
mp.events.add('govSellHouse.client', (name) => {
    mp.events.callRemote('govSellHouse.server', name);
});
mp.events.add('govSellHouseAns.client', (result) => {
    ui.callCEF('govSellHouseAns', [result]);   //1 - успешно; 0 - ошибка
});

// cost - цена продажи   name - id дома     playerId - ид покупателя
mp.events.add('sellHouse.client', (name, playerId, cost) => {
    mp.events.callRemote('sellHouse.server', name, playerId, cost);
});
// cost - цена продажи   name - id дома     playerId - ид покупателя
mp.events.add('sellHouseStop.client', () => {
    mp.events.callRemote('sellHouseStop.server');
});
mp.events.add('sellHouseInfo.client', (nick) => {
    //nick - ник того, кому продаешь
    ui.callCEF('sellHouseInfo', [nick]);
});
mp.events.add('sellHouseAns.client', (result) => {
    // 1 - успешно; 0 - ошибка; 2 - другой игрок не принял условия сделки
    ui.callCEF('sellHouseAns', [result]);   
});