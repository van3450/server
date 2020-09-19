"use strict";
let ui = require("./ragerp/browser/index.js");

let callerId = -1;

mp.events.add('phoneLoad.client', function (isHave, phone, messagesList) {
    ui.callCEF('loadPhoneInfo', [phone]);
    ui.callCEF('setMessagesList', [messagesList]);

    mp.keys.bind(0x26, true, function() {		// UP ARROW key
        if (mp.players.local.isBusy) return;
        ui.callCEF('showPhone', []);
        mp.gui.cursor.show(true, true);
        mp.players.local.isBusy = true;
    });

    mp.keys.bind(0x28, true, function() {		// DOWN ARROW key
        ui.callCEF('closeForm', []);
        mp.gui.cursor.show(false, false);
        mp.players.local.isBusy = false;
    });
});

mp.events.add('addContact.client', function (name, number) {
    
});

// добавление приложения
// house
// biz
mp.events.add('addApp.client', function (appName, info) {
    ui.callCEF('addApp', [appName, info]);
});
// удаление приложения
mp.events.add('removeApp.client', function (appName, index) {
    //index - номер дропнутого дома
    ui.callCEF('removeApp', [appName]);
});


// начало разговора на нашем конце
mp.events.add('startCall.client', function (number) {
    mp.events.callRemote('phoneCall.server', number);
});

mp.events.add('startCallAns.client', function (ans, targetId) {
    switch(ans) {
        case 0:     // Вызов принят
        callerId = targetId;
        mp.events.call('playerTalkByPhone.client', callerId);
        break;
        case 1:     // Нет номера
        break;
        case 2:     // Занято
        break;
        case 3:     // Сброс вызова
        break;
        case 4:     // Не поднял трубку
        break;
    }
    // ответ на звонок
    ui.callCEF('startCallAns', [ans]);
});

// сброс на нашем конце
mp.events.add('endCall.client', function () {
    mp.events.callRemote('endCall.server', callerId);
    callerId = -1;
    mp.events.call('playerStopTalkByPhone.client');
});

// сброс звонка на другом конце
mp.events.add('endCallAns.client', function () {
    callerId = -1;
    mp.events.call('playerStopTalkByPhone.client');
    ui.callCEF('endCall', []);
});

// Уведомление о том, что нам звонят
mp.events.add('inCall.client', function (startedPlayerNumber, id) {
    callerId = id;
    // звонок игроку на телефон
    ui.callCEF('inCall', [startedPlayerNumber]);
});

// Когда звонят нам и мы принимаем/отклоняем звонок
mp.events.add('inCallAns.client', function (ans) {
    mp.events.callRemote('phoneCallAns.server', ans, callerId);
    if (ans == 1 && callerId != -1) {
        mp.events.call('playerTalkByPhone.client', callerId);
    }
});

mp.events.add("playerQuit", (player) => {
	if (player.id == callerId) {
        mp.events.call('endCall.client');
        ui.callCEF('endCall', []);
    }
});


// Отправка сообщения
mp.events.add('sendMessage.client', function (message, number) {
    mp.events.callRemote('sendMessage.server', message, number);
});

// Получение сообщения
mp.events.add('setMessage.client', function (message, number) {
    ui.callCEF('setMessage', [message, number]);
});


mp.events.add('addContact.client', function (name, number) {
    mp.events.callRemote('addContact.server', name, number);
});

mp.events.add('removeContact.client', function (number) {
    mp.events.callRemote('removeContact.server', number);
});

mp.events.add('renameContact.client', function (number, name) {
    mp.events.callRemote('renameContact.server', number, name);
});