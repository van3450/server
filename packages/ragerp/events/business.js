"use strict";
let biz = require('../config').biz;
let db = require("../db/db");
let getRand = require("../systems/systems").getRand;

let bizTax = 0.01;

(function() {
    let clothesShopBiz = new Array();
    for (let i = 0; i < biz.length; i++) {
        if (biz[i].type == 4) {
            clothesShopBiz.push(biz[i]);
        }
    }
    module.exports.clothesShop = clothesShopBiz;
})();


(function () {
    for (let i = 0; i < biz.length; i++) {
        let businessInfoCol = mp.colshapes.newTube(biz[i].pos[0], biz[i].pos[1], biz[i].pos[2], 2.0, 5.0, 0);
        businessInfoCol.setVariable('type', ['businessInfo', i]);

        let businessBlipTexture;
        let businessBlipName;
        switch (biz[i].type) {
            case 0:
            businessBlipTexture = 361;
            businessBlipName = "АЗС";
            biz[i].typeName = "АЗС";
            break;
            case 1:
            businessBlipTexture = 52;
            biz[i].typeName = "Супермаркет";
            businessBlipName = "24/7";
            break;
            case 2:
            businessBlipTexture = 225;
            biz[i].typeName = "Автосалон";
            businessBlipName = "Автосалон";
            break;
            case 3:
            businessBlipTexture = 72;
            biz[i].typeName = "СТО";
            businessBlipName = "СТО";
            break;
            case 4:
            businessBlipTexture = 73;
            biz[i].typeName = "Магазин одежды";
            switch (biz[i].class) {
                case 0:
                businessBlipName = biz[i].name.split(' ')[0];
                break;
                case 1:
                businessBlipName = "Suburban";
                break;
                case 2:
                businessBlipName = "Ponsonbys";
                break;
            }
            break;
            case 5:
            businessBlipTexture = 110;
            biz[i].typeName = "Магазин оружия";
            businessBlipName = "Ammu-Nation";
            break;
        }

        mp.blips.new(businessBlipTexture, new mp.Vector3(biz[i].pos[0], biz[i].pos[1], biz[i].pos[2]),
        {
            name: businessBlipName,
            shortRange: true,
            dimension: 0
        });

        biz[i].owner = null;
        biz[i].rent = biz[i].price * 0.01;
    }

    //В бд хранится как {id, владелец(_id), время когда будет взиматься плата, количество материалов на складе}
    db.findBiz({}, function (ans) {
        if (ans[0] != null) {
            for (let i = 0; i < biz.length; i++) {
                for (let j = 0; j < ans.length; j++) {
                    if (biz[i].id == ans[j].id) {
                        biz[i].owner = ans[j].owner;
                        biz[i].date = ans[j].date;
                        if (ans[j].materials != null) {
                            biz[i].materials = ans[j].materials;
                        } else {
                            biz[i].materials = 0;
                        }

                        if (biz[i].owner != null) {
                            if (biz[i].date.getTime() - new Date().getTime() > 100) {
                                biz[i].timer = setTimeout(dropBiz, biz[i].date.getTime() - new Date().getTime(), i);
                            }
                            else {
                                dropBiz(i);
                            }
                        }
                        else {
                            biz[i].owner = null;
                        }
                    }
                }
            }
            console.log("[OK] Biz loaded");
        }
        else {
            let templatedate = new Date();
            let bizToDB = new Array();
            for (let i = 0; i < biz.length; i++) {
                biz[i].owner = null;
                biz[i].date = templatedate;
                biz[i].materials = 0;
                bizToDB.push({
                    id: biz[i].id,
                    owner: biz[i].owner,
                    date: biz[i].date,
                    materials: biz[i].materials
                });
            }
            db.insertBiz(bizToDB, function(ans) {
                console.log("[OK] Biz loaded");
            });
        }
    });
})();


mp.events.add('bizInfoShow.server', (player, currentBiz) => {
    if (currentBiz != null) {
        if (biz[currentBiz].owner == null) {
            player.call('bizInfoShowAns.client', [{
                name: biz[currentBiz].name,
                type: biz[currentBiz].typeName,
                rent: biz[currentBiz].rent,
                price: biz[currentBiz].price
            }]);
        }
        else {
            player.call('bizInfoShowAns.client', [{
                name: biz[currentBiz].name, 
                type: biz[currentBiz].typeName,
                owner: biz[currentBiz].owner.nick
            }]);
        }
    }
});

mp.events.add('buyBiz.server', (player, currentBiz) => {
    if (currentBiz != null) {
        if (biz[currentBiz].owner == null) {
            if (player.info.inventory.bank.cash >= biz[currentBiz].price) {
                player.info.inventory.bank.cash -= biz[currentBiz].price;
                biz[currentBiz].owner = {};
                biz[currentBiz].owner.id = player.info.personId;
                biz[currentBiz].owner.nick = player.info.mainInfo.nickname;

                let dateForClose = new Date();
                dateForClose.setHours(0);
                dateForClose.setDate(dateForClose.getDate() + 1);
                dateForClose.setHours(getRand(0, 24));
                dateForClose.setMinutes(0);
                dateForClose.setSeconds(0);
                biz[currentBiz].date = dateForClose;

                updateBiz(currentBiz, function() {
                    player.call('buyBizAns.client', [1, {
                        name: biz[currentBiz].name, 
                        type: biz[currentBiz].typeName,
                        owner: biz[currentBiz].owner.nick
                    }]);

                    let bizInfo = {
                        name: biz[currentBiz].id,
                        type: biz[currentBiz].typeName,
                        rent: biz[currentBiz].rent,
                        price: biz[currentBiz].price,
                        days: parseInt((biz[currentBiz].date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)),
                        resources: 100,
                        resourcesMax: 300,
                        cashBox: 10,
                        improvements: new Array()
                    };
                    player.call('addApp.client', "biz", bizInfo);

                    console.log("[info] Biz buyed: " + currentBiz);
                });

                biz[currentBiz].timer = setTimeout(dropBiz, biz[currentBiz].date.getTime() - new Date().getTime(), currentBiz);
            }
            else {
                player.call('buyBizAns.client', [0, {
                    name: biz[currentBiz].name,
                    type: biz[currentBiz].typeName,
                    rent: biz[currentBiz].rent,
                    price: biz[currentBiz].price
                }]);
            }
        }
        else
        {
            player.call('buyBizAns.client', [0, {
                name: biz[currentBiz].name, 
                type: biz[currentBiz].typeName,
                owner: biz[currentBiz].owner.nick
            }]);
        }
    }
});

var updateBiz = function (index, result) {
    let condition = {id: biz[index].id}
    let data = { $set: {owner: biz[index].owner, date: biz[index].date, materials: biz[index].materials}};
    db.updateBiz([{condition: condition, data: data}], function() {
        result();
    });
};

var dropBiz = function (index) {
    if (biz[index].date.getTime() <= new Date().getTime()) {
        let ownerId = biz[index].owner.id;
        biz[index].owner = null;
        updateBiz(index, function() {
            for (let i = 0; i < mp.players.length; i++) {
                if (ownerId == mp.players.at(i).info.personId) {
                    mp.players.at(i).call('removeApp.client', "biz", index);
                    i = mp.players.length;
                }
            }

            console.log("[info] Biz dropped " + index);
        });
    }
    else {
        biz[index].timer = setTimeout(dropBiz, biz[index].date.getTime() - new Date().getTime(), index);
    }
};

module.exports.checkBiz = function (ownerId, bizId, daysNum) {
    if (biz[bizId].owner.id == ownerId) {
        if ((biz[bizId].date.getTime() - new Date().getTime()) <= (30 - daysNum) * (24 * 60 * 60 * 1000)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

module.exports.pushMoney = function (ownerId, bizId, num)  {
    if (biz[bizId].owner.id == ownerId) {
        // todo
        return true;
    }
    else {
        return false;
    }
};
module.exports.popMoney = function (ownerId, bizId, num)  {
    if (biz[bizId].owner.id == ownerId) {
        //todo
        return true;
    }
    else {
        return false;
    }
};

module.exports.getBizPay = function (index)  {
    return biz[index].price * bizTax;
};

//После оплаты налогов за биз выбрать событие(в далнейшем возможно заменить index на id биза)
module.exports.payBiz = function ( index, numDays, callback)  {
    clearTimeout(biz[index].timer);
    biz[index].date.setTime(biz[index].date.getTime() + numDays * (24 * 60 * 60 * 1000));
    biz[index].timer = setTimeout(dropBiz, biz[index].date.getTime() - new Date().getTime(), index);
    updateBiz(index, function() {
        console.log("[info] Biz updated " + index);
        callback();
    });
};


//Вызывать в случае смены никнейма персоонажа и при каждом заходе его в игру(во избежание ошибок при смене никнейма на сайте)
mp.events.add('updateNick.server', (player) => {
    for (let i = 0; i < biz.length; i++) {
        if (biz[i].owner != null) {
            if (biz[i].owner.id == player.info.personId) {
                if (biz[i].owner.nick == player.info.mainInfo.nickname) return;
                biz[i].owner.nick = player.info.mainInfo.nickname;
                updateBiz(i, function() {
                    console.log("[info] Biz updated " + i);
                });
            }
        }
    }
});