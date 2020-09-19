"use strict";
var Clothes = require("../players/playerInfo").Clothes;
var clothesShop = require("./business").clothesShop;
const addDistance = require("../systems/systems").addDistance;

(function () {
    for (let i = 0; i < clothesShop.length; i++) {
        for (let j = 0; j < clothesShop[i].clothes.length; j++) {
            var clothesShopCol = mp.colshapes.newTube(clothesShop[i].clothes[j][0][0], clothesShop[i].clothes[j][0][1], clothesShop[i].clothes[j][0][2], 2.0, clothesShop[i].clothes[j][1], 0);
            clothesShopCol.setVariable('type', ['clothesShop', [i, j]]);
            if (clothesShop[i].clothes[j][2] == "shoes") {
                clothesShop[i].clothes[j][8][2] += 1.25;
                clothesShop[i].clothes[j][7][2] += 1;
                addDistance(clothesShop[i].clothes[j][7], clothesShop[i].clothes[j][8], 1);
            }
        }
    }
})();

var getNPCTexture = function(name) {
    switch(name) {
        case "CLOTH_1":
        return "s_m_m_movspace_01";
        case "CLOTH_2":
        return "s_m_m_movspace_01";
        case "CLOTH_3":
        return "s_m_m_movspace_01";
        case "CLOTH_4":
        return "s_m_m_movspace_01";
        case "CLOTH_5":
        return "s_m_m_movspace_01";
        case "CLOTH_6":
        return "s_m_m_movspace_01";
        case "CLOTH_7":
        return "s_m_m_movspace_01";
        case "CLOTH_8":
        return "s_m_m_movspace_01";
        case "CLOTH_9":
        return "s_m_m_movspace_01";
        case "CLOTH_10":
        return "s_m_m_movspace_01";
        case "CLOTH_11":
        return "s_m_m_movspace_01";
        case "CLOTH_12":
        return "s_m_m_movspace_01";
        case "CLOTH_13":
        return "s_m_m_movspace_01";
        case "CLOTH_14":
        return "s_m_m_movspace_01";
    }
}

var getNPC = function () {
    let NPC = new Array();
    for (let i = 0; i < clothesShop.length; i++) {
        NPC.push({texture: getNPCTexture(clothesShop[i].NPC), pos: new mp.Vector3(clothesShop[i].pos[0], clothesShop[i].pos[1], clothesShop[i].pos[2])});
    }
    return NPC;
}


mp.events.add('clothesShop.server', (player, currentShop) => {
    currentShop = currentShop.split(';');
    if (currentShop != null) {
        player.call('clothesShop.client', [player.info.customization.getGender(), clothesShop[currentShop[0]].class, clothesShop[currentShop[0]].subclass, clothesShop[currentShop[0]].clothes, currentShop[1], player.info.inventory.usedObjects.getPlayerClothes()]);
        player.dimension = player.id + 1;
    }
});

mp.events.add('clothesShopBuy.server', (player, objStr, index) => {
    let ans;
    let obj = objStr.split(';');
    obj.splice(obj.length - 1, 1);
    obj[5] = parseInt(obj[5]);
    for (let i = 6; i < obj.length; i++) {
        obj[i] = obj[i].split(',');
        for (let j = 0; j < obj[i].length; j++) {
            obj[i][j] = parseInt(obj[i][j]);
        }
    } 

    if (player.info.inventory.bank.cash >= obj[5]) {
        player.info.inventory.bank.cash -= obj[5];
        player.call('setMoney.server', [player.info.inventory.bank.cash]);
        player.info.inventory.add(new Clothes(obj));
        ans = index;
    }
    else {
        ans = -1;
    }
    player.call('clothesShopBuyAns.client', [ans]);
});

mp.events.add('clothesShopExit.server', (player) => {
    player.info.inventory.updateUsed(player);
    player.dimension = 0;
});