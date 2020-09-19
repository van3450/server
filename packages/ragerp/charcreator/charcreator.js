'use strict';
const db = require('../db/db');
let clothes = require("../players/clothes").clothes;
let Clothes = require("../players/playerInfo").Clothes;

const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
const creatorPlayerHeading = -185.0;


function applyCharacter(player) {
    player.setCustomization(
        player.info.customization.data.Gender == 0,

        player.info.customization.data.Parents.Mother,
        player.info.customization.data.Parents.Father,
        0,

        0,
        player.info.customization.data.Parents.Skin,
        0,

        player.info.customization.data.Parents.Similarity,
        1.0,
        0.0,

        player.info.customization.data.EyeColor,
        player.info.customization.data.Hair.Color,
        player.info.customization.data.Hair.HighlightColor,

        player.info.customization.data.Features
    );

    player.setClothes(2, player.info.customization.data.Hair.Hair, 0, 2);
    for (let i = 0; i < 10; i++) {
        player.setHeadOverlay(i, [player.info.customization.data.Appearance[i].value,
            player.info.customization.data.Appearance[i].opacity,
            player.info.customization.colorForOverlayIdx(i), 0]);
    }
}

// Телепортация + вызов события на клиенте
function sendToCreator(player) {
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
    player.usingCreator = true;
    player.call("charCreator.client", [true, JSON.stringify(player.info.customization.data)]);
}

// ЗАВЕРШАЮЩИЙ ЭТАП СОЗДАНИЯ ПЕРСООНАЖА ВОЗВРАЩЕНИЕ ЕГО В МЕНЮ
mp.events.add('setNick.server', (player, fullname, charData) => {
    db.findPlayersInfo({nickname: `${fullname}`}, function (ans) {
        if (player.info.number == -1) return;
        if (ans.length == 0) {
            player.info.customization.data = JSON.parse(charData);
            applyCharacter(player);

            player.info.mainInfo.nickname = fullname;
            player.info.mainInfo.created = true;
            let startClothes = clothes.getStart(player.info.customization.getGender());
            for(let i = 0; i < startClothes.length; i++) {
                player.info.inventory.addUsed(player, new Clothes(startClothes[i]));
            }
            player.info.inventory.bank.cash = 100;
            
            let charNum = player.info.number;
            player.charactersInfo[charNum].set(player.info.get());

            let condition = {_id: player.charactersInfo[charNum].personId};
            let data = { $set: player.charactersInfo[charNum].getWithoutNumber()};
            db.updatePlayersInfo([{condition: condition, data: data}], function () {
                db.insertNumbers({
                    personId: player.charactersInfo[charNum].personId,
                    nickname: player.charactersInfo[charNum].mainInfo.nickname,
                    phoneNumber: player.charactersInfo[charNum].inventory.phone.number,
                    bankNumber: player.charactersInfo[charNum].inventory.bank.number
                }, function() {
                    player.call('setNickAns.client', [1]);
                    player.charactersInfo = null;
                    player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
                    mp.events.call('charChoosed.server', player);
                });
            });
        }
        else {
            player.call('setNickAns.client', [0]);
        }
    });
});


// Инициализация необходимых значений
mp.events.add('playerJoin', player => {
    player.usingCreator = false;
});

mp.events.add('charCreator.server', player => {
    if(player.info.auth && !player.info.mainInfo.created) {
        if (freemodeCharacters.indexOf(player.model) == -1) {
            player.outputChatBox('Перcонаж не подходит для кастомизации');
        } else if (player.vehicle) {
            player.outputChatBox('Вы не можете кастомизировать персонажа из транспортного средства');
        } else {
            if (!player.usingCreator) {
                // установка дефолтных значений
                applyCharacter(player);
                sendToCreator(player);
            }
        }
    } else {
        player.outputChatBox('Вы не авторизованы или ваш персоонаж уже создан');
    }
});

//Вызывается при выходе игрока из редактора (без сохранения)
mp.events.add('charCreatorPlayerExit.server', player => {
    if (player.usingCreator) {
        player.usingCreator = false;
    }
});

// Загрузка (применение) персонажа (данные берутся из player.info.customization.data)
mp.events.add('loadCharacter.server', player => {
    applyCharacter(player);
    player.info.inventory.updateUsed(player);
});