"use strict";
var ui = require("./ragerp/browser/index.js");
const controls = mp.game.controls;

var currentShop = null;

var clothes = new Array();
var clothesInShop = new Array();
var playerClothes;
var currentCategory = "";
var shopName = "";
var shopCam;
var shopCamShoes;
var posnum;

//вызывается при подключении клиента
mp.events.add('setClothes.client', (objects) => {
    clothes = objects;
});


//при нажатии клавиши для входа в магазин
mp.keys.bind(0x45, true, function() {           //E
    if (currentShop != null) {
        mp.events.callRemote('clothesShop.server', currentShop[0] + ";" + currentShop[1]);
    }
});

mp.events.add('playerEnterColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'clothesShop') {
        currentShop = shape.getVariable('type')[1];
        ui.callCEF('addNotification', ["Нажмите $E для того, чтобы просмотреть одежду", "clothesShop"]);   
    }
});
mp.events.add('playerExitColshape', (shape) => {
    if (shape.getVariable('type') == undefined) return;
    if (shape.getVariable('type')[0] == 'clothesShop') {
        if (currentShop == null) {
            ui.callCEF('closeNotification', ["clothesShop"]);
        }
        else {
            if (currentShop[0] == shape.getVariable('type')[1][0] && currentShop[1] == shape.getVariable('type')[1][1]) {
                currentShop = null;
                ui.callCEF('closeNotification', ["clothesShop"]);
            }
        }
    }
});




//сразу после входа в магазин
mp.events.add('clothesShop.client', ( gender, shop, shopN, clothesPos, clothesPosnum, playerClothesIn) =>{
    if (clothes == undefined) {
        return;
    }
    if (shop == undefined) {
        return;
    }

    mp.gui.cursor.show(true, false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition(true);

    controls.disableControlAction(1, 199, true);    //ESC
    controls.disableControlAction(1, 200, true);    //Pause Menu

    playerClothes = playerClothesIn;

    posnum = clothesPosnum;
    mp.players.local.setRotation(0, 0, clothesPos[posnum][6], 0, true);
    
    mp.players.local.position = new mp.Vector3(clothesPos[posnum][5][0], clothesPos[posnum][5][1], clothesPos[posnum][5][2]);
    shopCam = mp.cameras.new('shop', new mp.Vector3(clothesPos[posnum][7][0], clothesPos[posnum][7][1], clothesPos[posnum][7][2]), new mp.Vector3(0, 0, 0), 45);
    shopCam.pointAtCoord(clothesPos[posnum][8][0], clothesPos[posnum][8][1], clothesPos[posnum][8][2]);

    shopCamShoes = mp.cameras.new('shopshoes', new mp.Vector3(clothesPos[posnum][7][0], clothesPos[posnum][7][1], clothesPos[posnum][7][2]), new mp.Vector3(0, 0, 0), 15);
    shopCamShoes.pointAtCoord(clothesPos[posnum][8][0], clothesPos[posnum][8][1], clothesPos[posnum][8][2]- 0.8);
    shopCamShoes.setActive(false);

    mp.game.cam.renderScriptCams(true, true, 1000, true, false);


    clothesInShop = getClothesInShop(gender, shop);
    shopName = shopN;

    mp.events.call('clothesShopCategory.client');
    mp.players.local.isBusy = true;
});

mp.events.add('clothesShopCategory.client', () => {
    let categories = getCategories();
    ui.callCEF( 'showClothingShop', [{shop: shopName, categ: translateCategories(categories)}]);
});

mp.events.add('clothesShopMainCategory.client', () => {
    shopCamShoes.setActive(false);
    shopCam.setActive(true);

    for(let i = 0; i < playerClothes.length; i++) {
        for(let j = 6; j < playerClothes[i].length; j++) {
            mp.players.local.setComponentVariation(playerClothes[i][j][0], playerClothes[i][j][1], playerClothes[i][j][2], playerClothes[i][j][3]);
        }
    }
});

mp.events.add('clothesShopChoiceCategory.client', ( category) => {
    currentCategory = translateCategories([category])[0];
    let undercategories = getUndercategories(currentCategory);
    undercategories = translateUndercategories(undercategories, currentCategory); 
    ui.callCEF( 'addItemsToCloth', [undercategories]);
});

mp.events.add('clothesShopChoiceUndercategory.client', ( undercategory) =>{
    if (currentCategory == 'shoes') {
        shopCam.setActive(false);
        shopCamShoes.setActive(true);
    }
    else {
        shopCamShoes.setActive(false);
        shopCam.setActive(true);
    }

    for(let i = 0; i < playerClothes.length; i++) {
        for(let j = 6; j < playerClothes[i].length; j++) {
            mp.players.local.setComponentVariation(playerClothes[i][j][0], playerClothes[i][j][1], playerClothes[i][j][2], playerClothes[i][j][3]);
        }
    }

    undercategory = translateUndercategories([undercategory], currentCategory)[0]; 
    let objects = getObjects(currentCategory, undercategory);
    ui.callCEF( 'addItemsToCloth', [objects]);
});

mp.events.add('clothesShopShow.client', (index) => {
    for(let i = 6; i < clothesInShop[index].length; i++) {
        mp.players.local.setComponentVariation(clothesInShop[index][i][0], clothesInShop[index][i][1], clothesInShop[index][i][2], clothesInShop[index][i][3]);
    }
});

mp.events.add('clothesShopBuy.client', (index) =>{
    let obj = "";
    for (let i = 0; i < clothesInShop[index].length; i++) {
        obj += clothesInShop[index][i] + ";";
    }
    mp.events.callRemote('clothesShopBuy.server', obj, index);
});

mp.events.add('clothesShopBuyAns.client', (ans) =>{
    if (ans > -1) {
        ui.callCEF( 'addMessage', [1]);

        let number = -1;
        for (let i = 0; i < playerClothes.length; i++) {
            if (playerClothes[i][2] == currentCategory) {
                number = i;
            }
        }
        if (number != -1) {
            playerClothes[number] = clothesInShop[ans];
        }
        else {
            playerClothes.push(clothesInShop[ans]);
        }
    } 
    else {
        ui.callCEF( 'addMessage', [0]);
    }
});

mp.events.add('clothesShopExit.client', () =>{
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.players.local.freezePosition(false);
    shopCam.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.events.callRemote('clothesShopExit.server');
    controls.enableControlAction(1, 199, true);    //ESC
    controls.enableControlAction(1, 200, true);    //Pause Menu
    mp.players.local.isBusy = false;
});


var getClothesInShop = function (gender, shop) {
    let ans = new Array();
    for (let i = 0; i < clothes.length; i++) {
        if (clothes[i][0] == gender && clothes[i][1] == shop) {
            ans.push(clothes[i]);
        }
    }
    return ans;
};

var getCategories = function () {
    let ans = new Array();
    for (let i = 0; i < clothesInShop.length; i++) {
        ans.push(clothesInShop[i][2]);
    }
    ans = Array.from(new Set(ans));
    return ans;
};

var getUndercategories = function (category) {
    let ans = new Array();
    for (let i = 0; i < clothesInShop.length; i++) {
        if (clothesInShop[i][2] == category) {
            ans.push(clothesInShop[i][3]);
        }
    }
    ans = Array.from(new Set(ans));
    return ans;
};

var getObjects = function (category, undercategory) {
    let ans = new Array();
    for (let i = 0; i < clothesInShop.length; i++) {
        if (clothesInShop[i][2] == category && clothesInShop[i][3] == undercategory) {
            ans.push({name: clothesInShop[i][4], price: clothesInShop[i][5], index: i});
        }
    }
    return ans;
};

var translateCategories = function (categories) {
    for (let i = 0; i < categories.length; i++) {
        switch (categories[i]) {
            case "head":
                categories[i] = "Голова";
                break;
            case "body":
                categories[i] = "Тело";
                break;
            case "legs":
                categories[i] = "Ноги";
                break;
            case "shoes":
                categories[i] = "Обувь";
                break;
            case "bags":
                categories[i] = "Сумки";
                break;
            case "accessories":
                categories[i] = "Аксессуары";
                break;
            case "Голова":
                categories[i] = "head";
                break;
            case "Тело":
                categories[i] = "body";
                break;
            case "Ноги":
                categories[i] = "legs";
                break;
            case "Обувь":
                categories[i] = "shoes";
                break;
            case "Сумки":
                categories[i] = "bags";
                break;
            case "Аксессуары":
                categories[i] = "accessories";
                break;
        }
    }
    return categories;
};

var translateUndercategories = function (undercategories, category) {
    if (clothesInShop[0][0] == "m") {
        switch (category) {
            case "body":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Футболки";
                            break;
                        case "1":
                            undercategories[i] = "Майки";
                            break;
                        case "2":
                            undercategories[i] = "Рубашки";
                            break;
                        case "3":
                            undercategories[i] = "Поло";
                            break;
                        case "4":
                            undercategories[i] = "Толстовки";
                            break;
                        case "5":
                            undercategories[i] = "Бомберы";
                            break;
                        case "6":
                            undercategories[i] = "Куртки";
                            break;
                        case "7":
                            undercategories[i] = "Шубы";
                            break;
                        case "8":
                            undercategories[i] = "Пиджаки";
                            break;
                        case "9":
                            undercategories[i] = "Кожаные куртки";
                            break;
                        case "10":
                            undercategories[i] = "Спортивные куртки";
                            break;
                        case "11":
                            undercategories[i] = "Джинсовые куртки";
                            break;
                        case "Футболки":
                            undercategories[i] = "0";
                            break;
                        case "Майки":
                            undercategories[i] = "1";
                            break;
                        case "Рубашки":
                            undercategories[i] = "2";
                            break;
                        case "Поло":
                            undercategories[i] = "3";
                            break;
                        case "Толстовки":
                            undercategories[i] = "4";
                            break;
                        case "Бомберы":
                            undercategories[i] = "5";
                            break;
                        case "Куртки":
                            undercategories[i] = "6";
                            break;
                        case "Шубы":
                            undercategories[i] = "7";
                            break;
                        case "Пиджаки":
                            undercategories[i] = "8";
                            break;
                        case "Кожаные куртки":
                            undercategories[i] = "9";
                            break;
                        case "Спортивные куртки":
                            undercategories[i] = "10";
                            break;
                        case "Джинсовые куртки":
                            undercategories[i] = "11";
                            break;
                    }
                }
                break;
            case "legs":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Джинсы";
                            break;
                        case "1":
                            undercategories[i] = "Спортивные штаны";
                            break;
                        case "2":
                            undercategories[i] = "Брюки";
                            break;
                        case "3":
                            undercategories[i] = "Шорты";
                            break;
                        case "4":
                            undercategories[i] = "Брюки карго";
                            break;
                        case "Джинсы":
                            undercategories[i] = "0";
                            break;
                        case "Спортивные штаны":
                            undercategories[i] = "1";
                            break;
                        case "Брюки":
                            undercategories[i] = "2";
                            break;
                        case "Шорты":
                            undercategories[i] = "3";
                            break;
                        case "Брюки карго":
                            undercategories[i] = "4";
                            break;
                    }
                }
                break;
            case "shoes":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Кроссовки";
                            break;
                        case "1":
                            undercategories[i] = "Ботинки";
                            break;
                        case "2":
                            undercategories[i] = "Туфли";
                            break;
                        case "Кроссовки":
                            undercategories[i] = "0";
                            break;
                        case "Ботинки":
                            undercategories[i] = "1";
                            break;
                        case "Туфли":
                            undercategories[i] = "2";
                            break;
                    }
                }
                break;
        }
    } 
    else {
        switch (category) {
            case "body":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Футболки";
                            break;
                        case "1":
                            undercategories[i] = "Майки";
                            break;
                        case "2":
                            undercategories[i] = "Рубашки";
                            break;
                        case "3":
                            undercategories[i] = "Поло";
                            break;
                        case "4":
                            undercategories[i] = "Толстовки";
                            break;
                        case "5":
                            undercategories[i] = "Бомберы";
                            break;
                        case "6":
                            undercategories[i] = "Куртки";
                            break;
                        case "7":
                            undercategories[i] = "Шубы";
                            break;
                        case "8":
                            undercategories[i] = "Пиджаки";
                            break;
                        case "9":
                            undercategories[i] = "Кожаные куртки";
                            break;
                        case "10":
                            undercategories[i] = "Спортивные куртки";
                            break;
                        case "11":
                            undercategories[i] = "Джинсовые куртки";
                            break;
                        case "12":
                            undercategories[i] = "Топы";
                            break;
                        case "Футболки":
                            undercategories[i] = "0";
                            break;
                        case "Майки":
                            undercategories[i] = "1";
                            break;
                        case "Рубашки":
                            undercategories[i] = "2";
                            break;
                        case "Поло":
                            undercategories[i] = "3";
                            break;
                        case "Толстовки":
                            undercategories[i] = "4";
                            break;
                        case "Бомберы":
                            undercategories[i] = "5";
                            break;
                        case "Куртки":
                            undercategories[i] = "6";
                            break;
                        case "Шубы":
                            undercategories[i] = "7";
                            break;
                        case "Пиджаки":
                            undercategories[i] = "8";
                            break;
                        case "Кожаные куртки":
                            undercategories[i] = "9";
                            break;
                        case "Спортивные куртки":
                            undercategories[i] = "10";
                            break;
                        case "Джинсовые куртки":
                            undercategories[i] = "11";
                            break;
                        case "Топы":
                            undercategories[i] = "12";
                            break;
                    }
                }
                break;
            case "legs":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Джинсы";
                            break;
                        case "1":
                            undercategories[i] = "Спортивные штаны";
                            break;
                        case "2":
                            undercategories[i] = "Брюки";
                            break;
                        case "3":
                            undercategories[i] = "Шорты";
                            break;
                        case "4":
                            undercategories[i] = "Брюки карго";
                            break;
                        case "5":
                            undercategories[i] = "Юбки";
                            break;
                        case "Джинсы":
                            undercategories[i] = "0";
                            break;
                        case "Спортивные штаны":
                            undercategories[i] = "1";
                            break;
                        case "Брюки":
                            undercategories[i] = "2";
                            break;
                        case "Шорты":
                            undercategories[i] = "3";
                            break;
                        case "Брюки карго":
                            undercategories[i] = "4";
                            break;
                        case "Юбки":
                            undercategories[i] = "5";
                            break;
                    }
                }
                break;
            case "shoes":
                for (let i = 0; i < undercategories.length; i++) {
                    switch (undercategories[i].toString()) {
                        case "0":
                            undercategories[i] = "Кроссовки";
                            break;
                        case "1":
                            undercategories[i] = "Ботинки";
                            break;
                        case "2":
                            undercategories[i] = "Туфли";
                            break;
                        case "Кроссовки":
                            undercategories[i] = "0";
                            break;
                        case "Ботинки":
                            undercategories[i] = "1";
                            break;
                        case "Туфли":
                            undercategories[i] = "2";
                            break;
                    }
                }
                break;
        }
    }

    return undercategories;
};