"use strict";

let showMoney = false;
let money = 0;

mp.events.add('render', () => {
    if (!showMoney) return;
    mp.game.graphics.drawText(`${money}$`, [0.95, 0.005], {
        font: 7,
        color: [68, 201, 104, 185],
        scale: [0.65, 0.65],
        outline: true
    });
});

mp.events.add('setMoney.client', (num) => {
    money = num;
});

mp.events.add('charChoosed.client', () => {
    showMoney = true;
});