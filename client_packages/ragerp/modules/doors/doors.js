"use strict";

var doors = null;

mp.events.add('setDoors.client', (doorsTemp) => {
    doors = doorsTemp;
    for (let i = 0; i < doors.length; i++) {
        let pos = doors[i].position.split(' ');
        mp.game.object.doorControl(doors[i].model, pos[0], pos[1], pos[2], doors[i].openedByDefault, 0, 0, 0);
    }
});