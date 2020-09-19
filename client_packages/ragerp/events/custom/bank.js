"use strict";
let ui = require("./ragerp/browser/index.js");

mp.events.add('playerEnterColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'bank') {
        mp.events.call('bankShow.client');
    }
});
mp.events.add('playerExitColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'bank') {
        ui.callCEF('closeForm', []);
        mp.events.call('closeBank.client');
    }
});


mp.events.add('closeBank.client', function () {
    mp.gui.cursor.show(false, false);
    mp.players.local.isBusy = false;
});

mp.events.add('bankShow.client', function () {
    mp.events.callRemote('bankShow.server');
    mp.gui.cursor.show(true, true);
    mp.players.local.isBusy = true;
});
mp.events.add('bankShowAns.client', function (bankInfo) {
    ui.callCEF('addInfoToBank', [bankInfo]);
    ui.callCEF('bankShow', []);
});

//положить деньги на счет
mp.events.add('pushBank.client', (num) => { 
    mp.events.callRemote('pushBank.server', num);
});
mp.events.add('pushBankAns.client', (ans) => {
    ui.callCEF('pushBankAns', [ans]);  //1-успешно 0-ошибка
});

//снять деньги со счета
mp.events.add('popBank.client', (num) => {  
    mp.events.callRemote('popBank.server', num);
});
mp.events.add('popBankAns.client', (ans) => {
    ui.callCEF('popBankAns', [ans]); //1-успешно 0-ошибка
});

//узнать ник получателя
mp.events.add('transferBankAsk.client', (num, numAccount) => {  
    mp.events.callRemote('transferBankAsk.server', num, numAccount);
});
mp.events.add('transferBankAskAns.client', (nick) => {
    ui.callCEF('transferBankAskAns', [nick]);
});

//снять деньги со счета
mp.events.add('transferBank.client', (num, numAccount) => {  
    mp.events.callRemote('transferBank.server', num, numAccount);
});
mp.events.add('transferBankAns.client', (ans) => {
    ui.callCEF('transferBankAns', [ans]); //1-успешно 0-ошибка
});

//положить деньги на телефон
mp.events.add('pushPhone.client', (num) => {  
    mp.events.callRemote('pushPhone.server', num);
});
mp.events.add('pushPhoneAns.client', (ans) => {  
    ui.callCEF('pushPhoneAns', [ans]); //1-успешно 0-ошибка
});

//оплата дома
mp.events.add('pushHouse.client', (name, daysNumber) => {  
    mp.events.callRemote('pushHouse.server', name, daysNumber);
});
mp.events.add('pushHouseAns.client', (ans) => {
    ui.callCEF('pushHouseAns', [ans]); //1-успешно 0-ошибка
});

//оплата биза
mp.events.add('pushBiz.client', (name, daysNumber) => {  
    mp.events.callRemote('pushBiz.server', name, daysNumber);
});
mp.events.add('pushBizAns.client', (ans) => {
    ui.callCEF('pushBizAns', [ans]); //1-успешно 0-ошибка
});

//положить деньги в кассу
mp.events.add('pushCashBox.client', (name, num) => { 
    mp.events.callRemote('pushCashBox.server', name, num);
});
mp.events.add('pushCashBoxAns.client', (ans) => {
    ui.callCEF('pushCashBoxAns', [ans]);  //1-успешно 0-ошибка
});

//снять деньги с кассы
mp.events.add('popCashBox.client', (name, num) => {  
    mp.events.callRemote('popCashBox.server', name, num);
});
mp.events.add('popCashBoxAns.client', (ans) => {
    ui.callCEF('popCashBoxAns', [ans]); //1-успешно 0-ошибка 
});