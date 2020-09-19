"use strict";
var ui = require("./ragerp/browser/index.js");

var currentBiz = null;


mp.keys.bind(0x42, true, function() {           //B
    //if (mp.players.local.isBusy) return;
    mp.events.call('bizInfoShow.client');
});

mp.events.add('bizInfoShow.client', () => {
    if (currentBiz != null) {
        mp.events.callRemote('bizInfoShow.server', currentBiz);
    }
});
mp.events.add('bizInfoShowAns.client', (bizInfo) => {
    mp.gui.cursor.show(true, true);
    ui.callCEF('showBiz', [bizInfo]);
    mp.players.local.isBusy = true;
});

mp.events.add('bizInfoClose.client', () => {
    mp.gui.cursor.show(false, false);
    mp.players.local.isBusy = false;
});

mp.events.add('buyBiz.client', () => {
    if (currentBiz != null) {
        mp.events.callRemote('buyBiz.server', currentBiz);
    }
});
mp.events.add('buyBizAns.client', (ans, bizInfo) => {
    ui.callCEF('checkBiz', [ans, bizInfo]);
});

mp.events.add('playerEnterColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'businessInfo') {
        currentBiz = shape.getVariable('type')[1];
        ui.callCEF('addNotification', ["Нажмите $B для просмотра информации о бизнесе", "bizInfo"]);
    }
});
mp.events.add('playerExitColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'businessInfo') {
        if (currentBiz == null) {
            ui.callCEF('closeForm', []);
            mp.gui.cursor.show(false, false);
            mp.players.local.isBusy = false;
            ui.callCEF('closeNotification', ["bizInfo"]);
        }
        else {
            if (currentBiz == shape.getVariable('type')[1]) {
                currentBiz = null;
                ui.callCEF('closeForm', []);
                mp.gui.cursor.show(false, false);
                mp.players.local.isBusy = false;
                ui.callCEF('closeNotification', ["bizInfo"]);
            }
        }
    }                   
});





// mp.events.add('orderProductsBiz.client', (name, num) => {

// });

// mp.events.add('govSellBiz.client', (name) => {    //name=id
    
// });
// ui.callCEF('govSellBizAns', [result]);   //1 - успешно; 0 - ошибка

// // cost - цена продажи
// mp.events.add('sellBiz.client', (name, idOrNick, type, cost) => { //type == true - id; type == false - nick
    
// });
// ui.callCEF('sellBizAns', [result]);   //1 - успешно; 0 - ошибка; 2 - другой игрок не принял условия сделки