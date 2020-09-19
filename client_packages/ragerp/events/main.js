"use strict";
let ui = require("./ragerp/browser/index.js");

let authCamera;

mp.events.add('browserDomReady', (browser) => {
    ui.callCEF('showClientAuth', []);
});

mp.events.add('playerJoin.client', () => {
    mp.players.local.setDefaultComponentVariation();
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition(true);

    mp.game.controls.disableControlAction(1, 199, true);    //ESC
    mp.game.controls.disableControlAction(1, 200, true);    //Pause Menu

    mp.players.local.position = new mp.Vector3(-1685.21, -1653.46, 203.55);
    authCamera = mp.cameras.new('auth', new mp.Vector3(-1685.21, -1653.46, 193.55), new mp.Vector3(0,0,0), 60);
    authCamera.pointAtCoord(-1639.35, -1575.13, 187.48);
    authCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});


mp.events.add('charChoosed.client', () => {
    //temp
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);
    authCamera.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);

    mp.game.controls.disableControlAction(1, 199, false);    //ESC
    mp.game.controls.disableControlAction(1, 200, false);    //Pause Menu
});




mp.events.add('discord.client', (nickname) => {
    //mp.discord.update("Classic Roleplay", `Playing as ${nickname}`);
});








//temp
mp.events.add('doortest', (status) => {
    mp.game.object.doorControl(520341586, -14.86892, -1441.182, 31.19323, status, 0, 0, 0);
});

//temp
mp.events.add('getrot', () => {
    let rot = mp.players.local.getRotation(0);
    //mp.gui.chat.push(`pitch: ${rot.x}; roll: ${rot.y}; yaw: ${rot.z};`);
});

//temp
mp.events.add('setrot', (rot) => {
    mp.players.local.setRotation(0, 0, rot, 0, true);
});

//camera.setRot(rotX, rotY, rotZ, p4);
mp.events.add('setcamrot', (rot) => {
    
});

//temp
mp.events.add('chatoff', () => {
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
});