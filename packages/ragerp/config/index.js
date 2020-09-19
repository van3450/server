"use strict";
module.exports.spawnPoints = require('./spawn_points.json').SpawnPoints;
module.exports.clothesJSON = require('./clothes.json');
module.exports.biz = require('./biz.json');
module.exports.houses = require('./houses.json');
module.exports.doors = require('./doorlist.json');
module.exports.banks = require('./banks.json');

require('./LoadIPL');


let fs = require('fs');

module.exports.saveBanks = function (banks) {
    let string = JSON.stringify(banks, null, '\t');
    fs.writeFile('./packages/ragerp/config/banks.json', string, function(err) {
        if(err) throw err;
        console.log("[OK] Banks saved");
    });
}





















































// парсинг файла с одеждой ClassicRP 1.0
// module.exports.parseClothes = function (clothes) {
//     let string = JSON.stringify(clothes, null, '\t');
//     fs.writeFile('./packages/ragerp/config/clothesParsed.json', string, function(err) {
//         if(err) throw err;
//         console.log("[OK] Clothes parsed");
//     });
// }
// (function () {
//     for (let key0 in clothesJSON) {
//         if (key0 == "male") {
//             let gender = "m";
//             for (let key1 in clothesJSON[key0]) {
//                 if (key1 == "top") {
//                     let category = "body";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let textureTop = key2;
//                         let textureUnder = clothesJSON[key0][key1][key2]["under"];
//                         let textureHands = clothesJSON[key0][key1][key2]["hands"];
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [11, parseInt(textureTop), parseInt(textureColor), 2], [8, parseInt(textureUnder), 0, 2], [3, parseInt(textureHands), 0, 2]]);
//                         }
//                     }
//                 }
//                 if (key1 == "legs") {
//                     let category = "legs";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let texture = key2;
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [4, parseInt(texture), parseInt(textureColor), 2]]);
//                         }
//                     }
//                 }
//                 if (key1 == "shoes") {
//                     let category = "shoes";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let texture = key2;
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [6, parseInt(texture), parseInt(textureColor), 2]]);
//                         }
//                     }
//                 }
//             }
//         } 
//         if (key0 == "female") {
//             let gender = "f";
//             for (let key1 in clothesJSON[key0]) {
//                 if (key1 == "top") {
//                     let category = "body";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let textureTop = key2;
//                         let textureUnder = clothesJSON[key0][key1][key2]["under"];
//                         let textureHands = clothesJSON[key0][key1][key2]["hands"];
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [11, parseInt(textureTop), parseInt(textureColor), 2], [8, parseInt(textureUnder), 0, 2], [3, parseInt(textureHands), 0, 2]]);
//                         }
//                     }
//                 }
//                 if (key1 == "legs") {
//                     let category = "legs";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let texture = key2;
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [4, parseInt(texture), parseInt(textureColor), 2]]);
//                         }
//                     }
//                 }
//                 if (key1 == "shoes") {
//                     let category = "shoes";
//                     for (let key2 in clothesJSON[key0][key1]) {
//                         let texture = key2;
//                         let type;
//                         let classs;
//                         if (clothesJSON[key0][key1][key2]["type"] != undefined) {
//                             type = clothesJSON[key0][key1][key2]["type"];
//                             classs = clothesJSON[key0][key1][key2]["class"];
//                         }
//                         else {
//                             type = "empty";
//                             classs = "empty";
//                         }
//                         for (let key3 in clothesJSON[key0][key1][key2]["colors"]) {
//                             let textureColor = key3;
//                             let price = clothesJSON[key0][key1][key2]["colors"][key3]["price"];
//                             let name = clothesJSON[key0][key1][key2]["colors"][key3]["name"];
//                             objects.push([gender, classs, category, type, name, parseInt(price), [6, parseInt(texture), parseInt(textureColor), 2]]);
//                         }
//                     }
//                 }
//             }
//         } 
//     }
//     require('../config/index').parseClothes(objects);
// })();