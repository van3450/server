"use strict";
var ui = require("./ragerp/browser/index.js");
mp.gui.chat.activate(false);
mp.gui.chat.show(false);
ui.callCEF('opacityChat', [0.0]);
var chatOpacity = 1.0;
var chatIsOpen = false;

mp.events.add('closeChat.client', () => {
        mp.gui.cursor.show(false, false);
});

function formatTime(value) {
    if (value < 10) value = '0' + value.toString();
    return value;
}

mp.events.add('charChoosed.client', () => {
        ui.callCEF('opacityChat', [1.0]);
        mp.keys.bind(0x54, true, function () {
            mp.gui.cursor.show(true, true);
            ui.callCEF('showChat', [true]);
        });
});



mp.events.add('getChatMessage.client', (type, message) => {
    mp.events.callRemote('getChatMessage.server', type, message);
});

mp.events.add('playerSaySomething.client', (nickname, id, message) => {
    message = `!{#ffffff}${nickname}[${id}] сказал: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerShout.client', (nickname, id, message) => {
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#ffdfa8}${nickname}[${id}] крикнул: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerWalkieTalkie.client', (nickname, id, message) => { //add rank
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#33cc66}[R] Генерал ${nickname}[${id}]: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerNonrpMessage.client', (nickname, id, message) => {
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#c6c695}(( ${nickname}[${id}]: ${message} ))`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerMeAction.client', (nickname, id, message) => {
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#dd90ff}${nickname}[${id}] ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerDoAction.client', (nickname, id, message) => {
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#dd90ff}${message} (${nickname}[${id}])`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerTryAction.client', (nickname, id, message, result) => {
    if (typeof(message) != "string") message = message.join(' ');
    message = `!{#dd90ff}${nickname}[${id}] ${message} ${(result ? '!{#66cc00}[Удачно]' : '!{#ff6600}[Неудачно]')}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('getAnswerMessage.client', (adminName, adminId, message) => {
    message = message.join(' ');
    message = `!{#f29f53}Администратор ${adminName}[${adminId}] ответил вам: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerBroadcast.client', (nickname, id, message) => {
    message = `!{#81dbcf}[Радио] Ведущий ${nickname}[${id}]: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('playerGnews.client', (nickname, id, message) => {
    message = message.join(' ');
    message = `!{#498fff}[Гос. новости] ${nickname}[${id}]: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('payDayMessage.client', (hours) => {
    mp.events.call('pushChatMessage.client', `!{#ffffff}Текущее время: !{#4fbeff}${formatTime(hours)}:00`);
    mp.events.call('pushChatMessage.client', '!{#ffdb66}БАНКОВСКИЙ ЧЕК');
    mp.events.call('pushChatMessage.client', '___________________');
    mp.events.call('pushChatMessage.client', '!{#ffffff}Зарплата: !{#66cc00}$1200');
    mp.events.call('pushChatMessage.client', '!{#ffffff}Баланс счета: !{#66cc00}$5600');
    mp.events.call('pushChatMessage.client', '___________________');
});


mp.events.add('pushChatMessage.client', (message) => {
    let date = new Date();
    message = `[${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}] ${message}`; 
    if (message.length > 120) {
        message = message.slice(0, 120);
    };
    
    ui.callCEF('pushChatMessage', [message]);
});