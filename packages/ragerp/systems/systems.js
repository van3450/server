"use strict";
module.exports.getRand = function(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports.addDistance = function(pos, posAt, num) {
    let dx = pos[0] - posAt[0];
    let dy = pos[1] - posAt[1];
    let dz = pos[2] - posAt[2];
    pos[0] += dx * num;
    pos[1] += dy * num;
    pos[2] += dz * num;
    return pos;
}