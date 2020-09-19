var getCameraDirection = () => {
    const heading = mp.game.cam.getGameplayCamRelativeHeading()+mp.players.local.getHeading();
    const pitch = mp.game.cam.getGameplayCamRot(0).x;
    let x = -Math.sin(heading*Math.PI/180.0);
    let y = Math.cos(heading*Math.PI/180.0);
    let z = Math.sin(pitch*Math.PI/180.0);
    let len = Math.sqrt(x*x+y*y+z*z);
    if (len != 0) {
      x = x/len;
      y = y/len;
      z = z/len;
    }
    return new mp.Vector3(x, y, z);
};