"use strict";
const WEATHER_LIST = [
    "EXTRASUNNY",
    "CLEAR",
    "CLOUDS",
    "SMOG",
    "FOGGY",
    "OVERCAST",
    "RAIN",
    "THUNDER",
    "CLEARING"
]

module.exports.WEATHER_LIST = WEATHER_LIST;

mp.world.setWeatherTransition("EXTRASUNNY");
var now = new Date();
console.log(now.getMinutes());

setTimeout(givePayday, (60-now.getMinutes())*60*1000);
console.log(`Пейдей через ${60-now.getMinutes()} минут`);

function setRandomWeather() {
    let weather = Math.floor(Math.random()*9);
    mp.world.setWeatherTransition(WEATHER_LIST[weather]);
    mp.players.forEach((currentPlayer) => {
        currentPlayer.call('pushChatMessage.client', [`Установили погоду номер ${weather} - ${WEATHER_LIST[weather]}`]);
    });
}

function givePayday() {
    
    let currentTime = new Date();
    mp.players.forEach((currentPlayer) => {
        currentPlayer.call('payDayMessage.client', [currentTime.getHours()]);
    });
    setRandomWeather();
    setTimeout(givePayday, 60*60*1000);
}


mp.events.add('/pd', (player, args) => {
    givePayday();
});