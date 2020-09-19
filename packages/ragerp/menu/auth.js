"use strict";
let db = require("../db/db.js");
let PlayerInfo = require("../players/playerInfo").Player;
const bcrypt = require('bcrypt-nodejs');
let errCatcher = require("../systems/errCatcher");


let accountNumbers;

(function() {
    db.findAccountNumbers({accNumObj: -1},function(ans) {
        if (ans != null) {
            accountNumbers = ans.accountNumbers;
            console.log("[OK] AccountNumbers loaded");
        }
        else {
            accountNumbers = 0;
            db.insertAccountNumbers({accNumObj: -1, accountNumbers: accountNumbers}, function() {
                console.log("[OK] AccountNumbers created");
            });
        }
    });
})();

let getAccountNumber = function() {
    return ++accountNumbers;
};


mp.events.add('login.server', (player, login, password) => {
    if(!player.info.auth && player.auth.times < 5) {
        let result = 0;
        db.findOne({login: `${login}`}, function(ans){
            if(ans != null) {
                mp.players.forEach(elem => {
                    if (elem.info.login != "") {
                        if (elem.info.login == ans.login) {
                            player.kick('Ваш аккаунт уже в сети');
                            return;
                        }
                    } 
                });

                bcrypt.compare(password, ans.password, function (err, same) {
                    if (err) throw err;
                    if (same) {
                        player.info.login = ans.login;
                        player.info.password = ans.password;
                        player.info.email = ans.email;
                        player.info.coins = ans.coins;
                        player.info.accountNumber = ans.accountNumber;

                        player.info.auth = true;

                        db.findPlayersInfo({personId: ans._id}, function(ans) {
                            if (ans.length > 0) {
                                player.charactersInfo = new Array();
                                for (let i = 0; i < ans.length; i++) {
                                    player.charactersInfo.push(new PlayerInfo());
                                    player.charactersInfo[i].set(ans[i], player);
                                    player.charactersInfo[i].personId = ans[i]._id;
                                }

                                mp.events.call('playerJoined.server', player);
                                result = 1;
                                player.call('loginAns.client', [result]);
                            }
                            else {
                                result = 0;
                                player.auth.times++;
                                player.call('loginAns.client', [result]);
                                throw errCatcher.throw(player, "Ошибка входа в аккаунт. Отсутствует PlayerInfo.");
                            }
                        });
                    }
                    else {
                        result = 0;
                        player.auth.times++;
                        player.call('loginAns.client', [result]);
                    }
                });
            }
            else {
                result = 0;
                player.auth.times++;
                player.call('loginAns.client', [result]);
            }
        });
    }
    else {
        player.kick('Вы ввели неправильный пароль более 5ти раз.');
    }
});

mp.events.add('register.server', (player, login, passwordNotHashed, email) => {
    if(!player.info.auth && player.reg.times < 5) {
        let result = 0;
        let playerInfoTemplate = new PlayerInfo();
        db.findOne({login: `${login}`}, function(ans){
            if(ans == null) {
                db.findOne({email: `${email}`}, function(ans){
                    if(ans == null) {
                        bcrypt.genSalt(10, function(err, salt) {
                            if (err) throw err;
                            bcrypt.hash(passwordNotHashed, salt, null, function(err, password) {
                                if (err) throw err;
                                let accNumber = getAccountNumber();
                                db.insert([{
                                    login: `${login}`,
                                    password: `${password}`,
                                    email: `${email}`,
                                    coins: playerInfoTemplate.coins,
                                    accountNumber: accNumber
                                }],function() {
                                    db.findOne({login: `${login}`, password: `${password}`}, function(ans) {
                                        let playerCharInfo = new Array();
                                        for (let i = 0; i < 3; i++) {
                                            playerCharInfo.push({
                                                personId: ans._id,
                                                number: i,
                                                mainInfo: playerInfoTemplate.mainInfo, 
                                                customization: playerInfoTemplate.customization,
                                                inventory: playerInfoTemplate.inventory
                                            });
                                            playerCharInfo[i].inventory.bank.number = accNumber * 10 + i;
                                            let phoneNumber = "" + accNumber;
                                            for (let j = 0; j < 6 - phoneNumber.length; j++) {
                                                phoneNumber += "0";
                                            }
                                            phoneNumber += i;
                                            playerCharInfo[i].inventory.phone.number = phoneNumber;
                                        }
                                        db.insertPlayersInfo(playerCharInfo, function() {
                                            result = 2;
                                            player.call('registerAns.client', [result]);
                                        });
                                    });
                                });
                            });
                        });
                    }
                    else {
                        result = 1;
                        player.reg.times++;
                        player.call('registerAns.client', [result]);
                    }
                });
            }
            else {
                result = 0;
                player.reg.times++;
                player.call('registerAns.client', [result]);
            }
        });
    }
    else {
        player.kick('Вы слишком много раз запросили форму регистрации. Перезайдите на сервер');
    }
});