"use strict";

module.exports.throw = function (player, cause) {
    if (player != null) {
        console.log(`[ERROR][id ${player.id}]: ${cause}`);
        player.kick('Произошла какая то ошибка, перезайдите на сервер');
    }
    else {
        console.log(`[ERROR][id null]: ${cause}`);
    }
}

module.exports.throwS = function (cause) {
    console.log(`[ERROR]: ${cause}`);
}