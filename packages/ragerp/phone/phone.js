"use strict";
let biz = require('../config').biz;
let houses = require('../config').houses;
let isExistPhoneNumber = require('../players/numbers').isExistPhoneNumber;

let isExist = function (number) {
    return isExistPhoneNumber(number);
}

mp.events.add('playerJoin', player => {
    player.isTalking = false;
});

mp.events.add('charChoosed.server', function (player) {
    mp.events.call('phoneLoad.server', player);
});

mp.events.add('phoneLoad.server', function (player) {
    let housesInfo = new Array();
    let bizInfo = new Array();
    let messagesList = new Array();
    for (let i = 0; i < biz.length; i++) {
        if (biz[i].owner == null) continue;
        if (biz[i].owner.id == player.info.personId) {
            bizInfo.push({
                name: biz[i].id,
                type: biz[i].typeName,
                rent: biz[i].rent,
                price: biz[i].price,
                days: parseInt((biz[i].date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)),
                resources: 100,
                resourcesMax: 300,
                cashBox: 10,
                improvements: new Array()
            });
        }
    }
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].owner == null) continue;
        if (houses[i].owner.id == player.info.personId) {
            housesInfo.push({
                name: houses[i].id,
                area: houses[i].area,
                class: houses[i].class,
                numRooms: houses[i].numRooms,
                garage: houses[i].garage,
                carPlaces: houses[i].carPlaces,
                rent: houses[i].rent,
                isOpened: false,
                improvements: new Array(),
                price: houses[i].price,
                days: parseInt((houses[i].date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))
            });
        }
    }
    // messagesList = [{messages: [{message: "", isMine: true}], number: ""}];
    player.call('phoneLoad.client', [player.info.inventory.phone.isHave,
        {
            isHave: player.info.inventory.phone.isHave,
            name: player.info.mainInfo.nickname,
            houses: housesInfo,
            biz: bizInfo,
            contacts: player.info.inventory.phone.contacts
        },
        messagesList
    ]);
});


mp.events.add('phoneCall.server', function (player, number) {
    if (player.info == null) return;
    if (!player.info.inventory.phone.isHave) return;
    if (player.isTalking) {
        player.call('startCallAns.client', [2]);
        return;
    };
    if (!isExist(number)) {
        player.call('startCallAns.client', [1]);
        return;
    }
    for (let i = 0; i < mp.players.length; i++) {
        if (mp.players[i].info == null) continue;
        if (!mp.players[i].info.inventory.phone.isHave) continue;
        if (mp.players[i].info.inventory.phone.number != number) continue;
        if (mp.players[i].isTalking) {
            player.call('startCallAns.client', [2]);
            return;
        }
        mp.players[i].call('inCall.client', [player.info.inventory.phone.number, player.id]);
        return;
    }
    player.call('startCallAns.client', [3]);
});

mp.events.add('phoneCallAns.server', function (player, ans, callerId) {
    if (callerId == -1) return;
    if (ans == 1) {
        if (mp.players.at(callerId).info == null) {
            if (player.info != null) {
                player.call('endCallAns.client', []);
            }
        }
        else {
            if (player.info != null) {
                player.isTalking = true;
                mp.players.at(callerId).isTalking = true;
                mp.players.at(callerId).call('startCallAns.client', [0, player.id]);
                return;
            }
            else {
                mp.players.at(callerId).call('startCallAns.client', [3]);
            }
        }
    }
    else {
        if (mp.players.at(callerId).info != null) {
            mp.players.at(callerId).call('startCallAns.client', [3]);
        }
    }
});

mp.events.add('endCall.server', function (player, callerId) {
    player.isTalking = false;
    if (callerId != -1) {
        if (mp.players.at(callerId) != null) {
            if (mp.players.at(callerId).info != null) {
                mp.players.at(callerId).isTalking = false;
                mp.players.at(callerId).call('endCallAns.client', []);
            }
        }
    }
});

mp.events.add('sendMessage.server', function (player, message, number) {
    if (player.info.inventory.phone.number == number) {
        player.info.inventory.phone.newMessage(number, message, true);
    }
    else {
        for (let i = 0; i < mp.players.length; i++) {
            if (player.id == i) continue;
            if (mp.players.at(i).info.inventory.phone.number == number) {
                mp.players.at(i).info.inventory.phone.newMessage(player.info.inventory.phone.number, message, false);
                mp.players.at(i).call('setMessage.client', [message, player.info.inventory.phone.number]);
            }
        }
    }
});

mp.events.add('addContact.server', function (player, name, number) {
    player.info.inventory.phone.addContact(name, number);
});

mp.events.add('removeContact.server', function (player, number) {
    player.info.inventory.phone.removeContact(number);
});

mp.events.add('renameContact.server', function (player, number, name) {
    player.info.inventory.phone.renameContact(player.info.inventory.phone.findContact(number), name, number);
});

mp.events.add('buyPhone.server', function (player) {

});