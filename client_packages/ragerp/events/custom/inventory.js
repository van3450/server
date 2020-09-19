"use strict";

var used = null;
var notUsed = null; 

// вызывать на UI
mp.events.add('getUsed.client', () => {
    mp.events.callRemote('getUsed.server');
});

mp.events.add('getUsedAns.client', (obj) => {
    // вывод на форму
    // скорее всего выводиться будет объект
    // {index, iconName}
    // temp
    used = obj;
    //mp.gui.chat.push(used + "");
});

// вызывать на UI
mp.events.add('getNotUsed.client', () => {
    mp.events.callRemote('getNotUsed.server');
});

mp.events.add('getNotUsedAns.client', (obj) => {
    // вывод на форму
    // скорее всего выводиться будет объект
    // {index, iconName}
    // temp
    notUsed = obj;
    //mp.gui.chat.push(notUsed + "");
});


mp.events.add('addUsed.client', (obj) => {
    mp.events.callRemote('addUsed.server', [obj]);
});

mp.events.add('addUsedAns.client', (ans) => {
    // Обработка ответа
});

mp.events.add('addNotUsed.client', (obj) => {
    mp.events.callRemote('addNotUsed.server', [obj]);
});

mp.events.add('addNotUsedAns.client', (ans) => {
    // Обработка ответа
});

mp.events.add('moveUsed.client', (obj) => {
    mp.events.callRemote('moveUsed.server', [obj]);
});

mp.events.add('moveUsedAns.client', (ans) => {
    // Обработка ответа
});

mp.events.add('moveNotUsed.client', (obj) => {
    mp.events.callRemote('moveNotUsed.server', [obj]);
});

mp.events.add('moveNotUsedAns.client', (ans) => {
    // Обработка ответа
});

mp.events.add('removeUsed.client', (obj) => {
    mp.events.callRemote('removeUsed.server', [obj]);
});

mp.events.add('removeUsedAns.client', (ans) => {
    // Обработка ответа
});

mp.events.add('removeNotUsed.client', (obj) => {
    mp.events.callRemote('removeNotUsed.server', [obj]);
});

mp.events.add('removeNotUsedAns.client', (ans) => {
    // Обработка ответа
});