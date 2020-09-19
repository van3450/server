"use strict";
let checkBiz = require('./business').checkBiz;
let payBiz = require('./business').payBiz;
let getBizPay = require('./business').getBizPay;
let pushMoney = require('./business').pushMoney;
let popMoney = require('./business').popMoney;

let banks = require('../config/index').banks;
let saveBanks = require('../config/index').saveBanks;

mp.events.add('/createBank', (player) => {
    if (!player.info.charChoosed) return;
    banks.push({pos: [player.position.x, player.position.y, player.position.z - 1]});
    let i = banks.length - 1;
    var bankCol = mp.colshapes.newTube(banks[i].pos[0], banks[i].pos[1], banks[i].pos[2], 2.0, 1, 0);
    bankCol.setVariable('type', ['bank']);
    mp.markers.new(1, new mp.Vector3(banks[i].pos[0], banks[i].pos[1], banks[i].pos[2]), 0.75, { dimension: 0, color: [42, 175, 29, 255] });
    saveBanks(banks);
    player.notify("Новый банк создан");
});


(function () {
    for (let i = 0; i < banks.length; i++) {
        var bankCol = mp.colshapes.newTube(banks[i].pos[0], banks[i].pos[1], banks[i].pos[2], 2.0, 1, 0);
        bankCol.setVariable('type', ['bank']);
        mp.markers.new(1, new mp.Vector3(banks[i].pos[0], banks[i].pos[1], banks[i].pos[2]), 0.75, { dimension: 0, color: [42, 175, 29, 255] });
    }
})();

mp.events.add('bankShow.server', (player) => {
    player.call('bankShowAns.client', [{
        name: player.info.mainInfo.nickname,
        money: player.info.inventory.bank.money,
        cash: player.info.inventory.bank.cash,
        number: player.info.inventory.bank.number,
        phoneMoney: player.info.inventory.phone.money
    }]);
});

mp.events.add('pushBank.server', (player, num) => {
    num = parseInt(num);
    if (isNaN(num)){
        player.call('pushBankAns.client', [0]);
        return;
    }
    if (!(num <= 1000000000 && num >= 0)) {
        player.call('pushBankAns.client', [0]);
        return;
    }
    if (player.info.inventory.bank.cash >= num) {
        player.info.inventory.bank.cash -= num;
        player.info.inventory.bank.money += num;
        player.call('pushBankAns.client', [1]);
        player.call('setMoney.client', [player.info.inventory.bank.cash]);
    }
    else {
        player.call('pushBankAns.client', [0]);
    }
});

mp.events.add('popBank.server', (player, num) => {
    num = parseInt(num);
    if (isNaN(num)){
        player.call('pushBankAns.client', [0]);
        return;
    }
    if (!(num <= 1000000000 && num >= 0)) {
        player.call('popBankAns.client', [0]);
        return;
    }
    if (player.info.inventory.bank.money >= num) {
        player.info.inventory.bank.money -= num;
        player.info.inventory.bank.cash += num;
        player.call('popBankAns.client', [1]);
        player.call('setMoney.client', [player.info.inventory.bank.cash]);
    }
    else {
        player.call('popBankAns.client', [0]);
    }
});

mp.events.add('transferBankAsk.server', (player, numAccount) => {
    
});

mp.events.add('transferBank.server', (player, num, numAccount) => {
    
});

mp.events.add('pushPhone.server', (player, num) => {
    num = parseInt(num);
    if (isNaN(num)){
        player.call('pushPhoneAns.client', [0]);
        return;
    }
    if (!(num <= 1000000000 && num >= 0)) {
        player.call('pushPhoneAns.client', [0]);
        return;
    }
    if (player.info.inventory.phone.isHave) {
        if (player.info.inventory.bank.money >= num) {
            player.info.inventory.bank.money -= num;
            player.info.inventory.phone.money += num;
            player.call('pushPhoneAns.client', [1]);
        }
        else {
            player.call('pushPhoneAns.client', [0]);
        }
    }
    else {
        player.call('pushPhoneAns.client', [0]);
    }
});

mp.events.add('pushHouse.server', (player, name, daysNumber) => {
    
});

mp.events.add('pushBiz.server', (player, name, daysNumber) => {
    if (daysNumber <= 0) {
        player.call('pushBizAns.client', [0]);
        return;
    }
    if (checkBiz(player.info.personId, name, daysNumber)) {
        let cost = daysNumber * getBizPay(name);
        if (player.info.inventory.bank.money >= cost) {
            player.info.inventory.bank.money -= cost;
            payBiz(name, daysNumber, function() {
                player.call('pushBizAns.client', [1]);
            });
        }
        else {
            player.call('pushBizAns.client', [0]);
        }
    }
    else {
        player.call('pushBizAns.client', [0]);
    }
});

mp.events.add('pushCashBox.server', (player, name, num) => {
    num = parseInt(num);
    if (isNaN(num)){
        player.call('pushCashBoxAns.client', [0]);
        return;
    }
    if (!(num <= 1000000000 && num >= 0)) {
        player.call('pushCashBoxAns.client', [0]);
        return;
    }
    if (player.info.inventory.bank.money >= num) {
        player.info.inventory.bank.money -= num;
        if (pushMoney(player.info.personId, name, num)) {
            player.call('pushCashBoxAns.client', [1]);
        }
        else {
            player.call('pushCashBoxAns.client', [0]);
        }
    }
});

mp.events.add('popCashBox.server', (player, name, num) => {
    num = parseInt(num);
    if (isNaN(num)){
        player.call('popCashBoxAns.client', [0]);
        return;
    }
    if (!(num <= 1000000000 && num >= 0)) {
        player.call('popCashBoxAns.client', [0]);
        return;
    }
    if (popMoney(player.info.personId, name, num)) {
        player.call('popCashBoxAns.client', [1]);
    }
    else {
        player.call('popCashBoxAns.client', [0]);
    }
});