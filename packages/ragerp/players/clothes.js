"use strict";
let systems = require('../systems/systems');
const clothesJSON = require('../config/').clothesJSON;


// (0)gender, (1)class, (2)category, (3)type, (4)name, (5)price, (6)[componentNumber, drawable, texture, palette]
// class - магазин; type - подкатегория одежды см. ниже
let objects = clothesJSON;
/*[
    [ "m", "empty", "head", "empty", "empty", 0, [1, 0, 0, 2]],
    [ "m", "empty", "body", "empty", "empty", 0, [3, 15, 0, 2], [8, 15, 0, 2], [11, 15, 0, 2]],
    [ "m", "empty", "legs", "empty", "empty", 0, [4, 61, 0, 2]],
    [ "m", "empty", "shoes", "empty", "empty", 0, [6, 34, 0, 2]],
    [ "m", "empty", "bags", "empty", "empty", 0, [5, 0, 0, 2]],
    [ "m", "empty", "accessories", "empty", "empty", 0, [7, 0, 0, 2]],

    [ "f", "empty", "head", "empty", "empty", 0, [1, 0, 0, 2]],
    [ "f", "empty", "body", "empty", "empty", 0, [3, 15, 0, 2], [8, 2, 0, 2], [11, 18, 0, 2]],
    [ "f", "empty", "legs", "empty", "empty", 0, [4, 17, 0, 2]],
    [ "f", "empty", "shoes", "empty", "empty", 0, [6, 35, 0, 2]],
    [ "f", "empty", "bags", "empty", "empty", 0, [5, 0, 0, 2]],
    [ "f", "empty", "accessories", "empty", "empty", 0, [7, 0, 0, 2]]
];*/

module.exports.clothes = {
    getForShop: () => {
        let ans = new Array();
        for(let i = 0; i < objects.length; i++) {
            if (objects[i][1] != "empty" && objects[i][3] != "empty" && objects[i][4] != "empty") {
                ans.push(objects[i]);
            }
        }
        return ans;
    },
    get: (id) => {
        
    },
    get: (gender, store) => {
        let ans = new Array();
        for(let i = 0; i < objects.length; i++) {
            if ((objects[i][0] == gender) && (objects[i][1] == store)) {
                ans.push(objects[i]);
            }
        }
        return ans;
    },
    get: (gender, store, category) => {
        let ans = new Array();
        for(let i = 0; i < objects.length; i++) {
            if ((objects[i][0] == gender) && (objects[i][1] == store) && (objects[i][2] == category)) {
                ans.push(objects[i]);
            }
        }
        return ans;
    },
    set: (player, obj) => {
        for(let i = 6; i < obj.length; i++) {
            player.setClothes(obj[i][0], obj[i][1], obj[i][2], obj[i][3]);
        }
    },
    getStart: (gender) => {
        //let body = [["m", 0, "body", 1, "Белая майка", 20, [11, 5, 0, 2], [8, 15, 0, 2], [3, 5, 0, 2]], 
        let gen_randomp_clothes_4 = systems.getRand(0, 2);
        let gen_randomp_clothes_6 = systems.getRand(0, 2);
        let gen_randomp_clothes_8 = systems.getRand(0, 2);
        let gen_randomp_clothes_11 = systems.getRand(0, 2);
        let ans;
        if (gender == "m") {
            ans = [
                [ "m", "start", "body", "empty", "empty", 0, [3, 0, 0, 2], [8, 1, parseInt(gen_randomp_clothes_8), 2], [11, 1, parseInt(gen_randomp_clothes_11), 2]],
                [ "m", "start", "legs", "empty", "empty", 0, [4, 1, parseInt(gen_randomp_clothes_4), 2]],
                [ "m", "start", "shoes", "empty", "empty", 0, [6, 1, parseInt(gen_randomp_clothes_6), 2]]
            ];
        }
        else {
            ans = [
                [ "f", "start", "body", "empty", "empty", 0, [3, 0, 0, 2], [8, 1, parseInt(gen_randomp_clothes_8), 2], [11, 1, parseInt(gen_randomp_clothes_11), 2]],
                [ "f", "start", "legs", "empty", "empty", 0, [4, 1, parseInt(gen_randomp_clothes_4), 2]],
                [ "f", "start", "shoes", "empty", "empty", 0, [6, 1, parseInt(gen_randomp_clothes_6), 2]]
            ];
        }
        return ans;
    }
};


// type в json
// *Мужские 
// Торс:
// 0 футболки
// 1 майки
// 2 рубашки
// 3 поло
// 4 толстовки
// 5 бомберы
// 6 куртки
// 7 шубы
// 8 пиджаки 
// 9 кожаные куртки
// 10 спортивные куртки
// 11 джинсовые куртки
// Ноги:
// 0 джинсы
// 1 спортивные штаны
// 2 брюки
// 3 шорты
// 4 брюки карго
// Обувь:
// 0 кроссовки
// 1 ботинки
// 2 туфли
// *Женские
// Торс:
// 0 футболки
// 1 майки
// 2 рубашки
// 3 поло
// 4 толстовки
// 5 бомберы
// 6 куртки
// 7 шубы
// 8 пиджаки 
// 9 кожаные куртки
// 10 спортивные куртки
// 11 джинсовые куртки
// 12 топы
// Ноги:
// 0 джинсы
// 1 спортивные штаны
// 2 брюки
// 3 шорты
// 4 брюки карго
// 5 юбки
// Обувь:
// 0 кроссовки
// 1 ботинки
// 2 туфли