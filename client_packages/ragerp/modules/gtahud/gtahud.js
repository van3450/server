"use strict";

const HUD = 0;
const HUD_WANTED_STARS = 1;
const HUD_WEAPON_ICON = 2;
const HUD_CASH = 3;
const HUD_MP_CASH = 4;
const HUD_MP_MESSAGE = 5;
const HUD_VEHICLE_NAME = 6;
const HUD_AREA_NAME = 7;
const HUD_VEHICLE_CLASS = 8;
const HUD_STREET_NAME = 9;
const HUD_HELP_TEXT = 10;
const HUD_FLOATING_HELP_TEXT_1 = 11;
const HUD_FLOATING_HELP_TEXT_2 = 12;
const HUD_CASH_CHANGE = 13;
const HUD_RETICLE = 14;
const HUD_SUBTITLE_TEXT = 15;
const HUD_RADIO_STATIONS = 16;
const HUD_SAVING_GAME = 17;
const HUD_GAME_STREAM = 18;
const HUD_WEAPON_WHEEL = 19;
const HUD_WEAPON_WHEEL_STATS = 20;
const MAX_HUD_COMPONENTS = 21;
const MAX_HUD_WEAPONS = 22;
const MAX_SCRIPTED_HUD_COMPONENTS = 141;


mp.events.add('playerJoin.client', () => {
    //mp.game.controls.disableControlAction(1, 200, true);    //Pause Menu
});



let isCamStatic = false;
let playerCam;
function degToRad (deg) { return deg / 180 * Math.PI; }

mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(HUD_CASH);
    mp.game.ui.hideHudComponentThisFrame(HUD_MP_CASH);
    /*if (isCamStatic) {
        let localpos = mp.players.local.position;
        let localrot = mp.players.local.getHeading() - 180;
        mp.gui.chat.push("" + localrot);
        playerCam.setCoord(localpos.x + 3 * Math.sin(degToRad(localrot)), localpos.y + 3 * Math.cos(degToRad(localrot)), localpos.z + 1.75);
        playerCam.pointAtCoord( localpos.x, localpos.y, localpos.z);
    }*/
});


// Не работает
exports.setCamStatic = function (isCamStaticT) {
    isCamStatic = isCamStaticT;
    //let localpos = mp.players.local.position;
    //let localrot = mp.players.local.getHeading() - 180;
    if(isCamStatic) {
        //mp.game.controls.disableControlAction(1, 0, true);
        //playerCam = mp.cameras.new('playerCam', new mp.Vector3(localpos.x + 3 * Math.sin(degToRad(localrot)), localpos.y + 3 * Math.cos(degToRad(localrot)), localpos.z + 1.75), new mp.Vector3(0, 0, 0), 60);
        //playerCam.pointAtCoord( localpos.x, localpos.y, localpos.z);
        //mp.game.cam.renderScriptCams(true, true, 500, true, false);
    }
    else {

        //mp.game.controls.disableControlAction(1, 0, false);
        //playerCam.destroy(true);
        //mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
};