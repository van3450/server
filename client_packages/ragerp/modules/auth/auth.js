"use strict";
var ui = require("./ragerp/browser/index.js");

//вызывается при возврате ответа от сервера
mp.events.add('loginAns.client', result => {
    ui.callCEF('checkLoginForm', [result]);
});

//вызывается при возврате ответа от сервера
mp.events.add('registerAns.client', result => {
    ui.callCEF('checkRegForm', [result]);
});

//вызывается при нажатии кнопки на формочке
mp.events.add('login.client', (login, password) => {
    mp.events.callRemote('login.server', login, password);
});

//вызывается при нажатии кнопки на формочке
mp.events.add('register.client', (login, password, email) => {
    mp.events.callRemote('register.server', login, password, email);
});