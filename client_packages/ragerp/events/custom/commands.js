let noclip = false;
let charpos = false;

mp.events.add('charpos.client', () => {
    charpos = !charpos;
});

mp.events.add('noclip.client', () => {
    mp.players.local.setHasGravity(noclip);
    mp.players.local.setInvincible(!noclip);
    mp.players.local.setCollision(noclip, true);
    if (!noclip) {
        mp.players.local.setMaxSpeed(50);
    } else {
        mp.players.local.setMaxSpeed(10);
    }
    mp.players.local.freezePosition(false);
    noclip = !noclip;
});

mp.events.add('render', () => {
    if (noclip) {
      if (mp.keys.isDown(87) === true) {
        const pos = mp.players.local.position;
        const dir = getCameraDirection();
        mp.players.local.setCoordsNoOffset(pos.x + dir.x, pos.y + dir.y, pos.z + dir.z, false, false, false);
      }
      if (mp.keys.isDown(83) === true) {
        const pos = mp.players.local.position;
        const dir = getCameraDirection();
        mp.players.local.setCoordsNoOffset(pos.x - dir.x, pos.y - dir.y, pos.z - dir.z, false, false, false);
      }
    }
    if (charpos) {
      const pos = mp.players.local.position;
      mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005],
      {
        font: 4,
        color: [255, 255, 255, 255],
        scale: [0.5, 0.5],
        outline: true,
      });
    }
  });