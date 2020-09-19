"use strict";
let clothes = require("../players/clothes").clothes;
let err = require("../systems/errCatcher");

let MainInfo = function () {
    this.nickname = "";
    this.created = false;

    this.set = function (data, player) {
        if (data.nickname != null &&
            data.created != null) {
            this.nickname = data.nickname;
            this.created = data.created;
        }
        else {
            err.throw(player, "Ошибка с загрузкой MainInfo");
        }
    };
};

let Customization = function() {
    this.data = {
        Gender: 0,

        Parents: {
            Father: 0,
            Mother: 21,
            Similarity: 1,
            Skin: 0
        },

        Features: [],
        Appearance: [],

        Hair: {
            Hair: 0,
            Color: 0,
            HighlightColor: 0
        },

        EyebrowColor: 0,
        BeardColor: 0,
        EyeColor: 0,
        BlushColor: 0,
        LipstickColor: 0,
        ChestHairColor: 0
    }
    for (let i = 0; i < 20; i++) this.data.Features.push(0.0);
    for (let i = 0; i < 10; i++) this.data.Appearance.push({value: 255, opacity: 1.0});

    this.colorForOverlayIdx = function(index) {
        let color;

        switch (index) {
            case 1:
                color = this.data.BeardColor;
            break;

            case 2:
                color = this.data.EyebrowColor;
            break;

            case 5:
                color = this.data.BlushColor;
            break;

            case 8:
                color = this.data.LipstickColor;
            break;

            case 10:
                color = this.data.ChestHairColor;
            break;

            default:
                color = 0;
        }
        return color;
    };

    this.set = function (obj, player) {
        if (obj.data != null) {
            this.data = obj.data;
        }
        else {
            err.throw(player, "Ошибка с загрузкой Customization");
        }
    };

    this.getGender = function () {
        if (this.data.Gender == 0) {
            return "m";
        } else if (this.data.Gender == 1) {
            return "f";
        }
    };
}

let UsedObjects = function () {
    this.head = null;
    this.body = null;
    this.legs = null;
    this.shoes = null;
    this.bags = null;
    this.accessories = null;

    this.add = function (player, data) {
        let ans = null;
        if (data == null) {
            return ans;
        }
        if(data.getType() == "clothes") {
            if (data.getCategory() == "head") {
                ans = this.remove(player, this.head);
                this.head = data;
            } 
            else if (data.getCategory() == "body") {
                ans = this.remove(player, this.body);
                this.body = data;
            }
            else if (data.getCategory() == "legs") {
                ans = this.remove(player, this.legs);
                this.legs = data;
            }
            else if (data.getCategory() == "shoes") {
                ans = this.remove(player, this.shoes);
                this.shoes = data;
            }
            else if (data.getCategory() == "bags") {
                ans = this.remove(player, this.bags);
                this.bags = data;
            }
            else if (data.getCategory() == "accessories") {
                ans = this.remove(player, this.accessories);
                this.accessories = data;
            }

            clothes.set(player, data.get());
        }
        return ans;
    };
    this.remove = function (player, data) {
        if (data == null) {
            return null;
        }
        if(data.getType() == "clothes") {
            let gender;
            if(player.info.customization.data.Gender == 0) {
                gender = "m";
            } 
            else {
                gender = "f";
            }
            
            if (data.getCategory() == "head") {
                
                if (this.head != null) {
                    this.head = null;
                    clothes.set(player, clothes.get(gender, "empty", "head"));
                }
                else {
                    return null;
                }
            } 
            else if (data.getCategory() == "body") {
                if (this.body != null) {
                    this.body = null;
                    clothes.set(player, clothes.get(gender, "empty", "body"));
                }
                else {
                    return null;
                }
            }
            else if (data.getCategory() == "legs") {
                if (this.legs != null) {
                    this.legs = null;
                    clothes.set(player, clothes.get(gender, "empty", "legs"));
                }
                else {
                    return null;
                }
            }
            else if (data.getCategory() == "shoes") {
                if (this.shoes != null) {
                    this.shoes = null;
                    clothes.set(player, clothes.get(gender, "empty", "shoes"));
                }
                else {
                    return null;
                }
            }
            else if (data.getCategory() == "bags") {
                if (this.bags != null) {
                    this.bags = null;
                    clothes.set(player, clothes.get(gender, "empty", "bags"));
                }
                else {
                    return null;
                }
            }
            else if (data.getCategory() == "accessories") {
                if (this.accessories != null) {
                    this.accessories = null;
                    clothes.set(player, clothes.get(gender, "empty", "accessories"));
                }
                else {
                    return null;
                }
            }
        }
        return data;
    };
    this.update = function (player) {
        if (this.head != null) {
            clothes.set(player, this.head.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "head"));
        }
        if (this.body != null) {
            clothes.set(player, this.body.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "body"));
        }
        if (this.legs != null) {
            clothes.set(player, this.legs.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "legs"));
        }
        if (this.shoes != null) {
            clothes.set(player, this.shoes.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "shoes"));
        }
        if (this.bags != null) {
            clothes.set(player, this.bags.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "bags"));
        }
        if (this.accessories != null) {
            clothes.set(player, this.accessories.object);
        }
        else {
            clothes.set(player, clothes.get(player.info.customization.getGender(), "empty", "accessories"));
        }
    };
    this.set = function (objects) {
        if(objects.head != null) {
            this.head = new Clothes(objects.head.object);
        }
        if(objects.body != null) {
            this.body = new Clothes(objects.body.object);
        }
        if(objects.legs != null) {
            this.legs = new Clothes(objects.legs.object);
        }
        if(objects.shoes != null) {
            this.shoes = new Clothes(objects.shoes.object);
        }
        if(objects.bags != null) {
            this.bags = new Clothes(objects.bags.object);
        }
        if(objects.accessories != null) {
            this.accessories = new Clothes(objects.accessories.object);
        }
    };
    //Получить все вещи одетые на игрока в одном массиве
    this.getPlayerClothes = function () {
        let ans = Array();
        if (this.head != null) {
            ans.push(this.head.get());
        }
        if (this.body != null) {
            ans.push(this.body.get());
        }
        if (this.legs != null) {
            ans.push(this.legs.get());
        }
        if (this.shoes != null) {
            ans.push(this.shoes.get());
        }
        if (this.bags != null) {
            ans.push(this.bags.get());
        }
        if (this.accessories != null) {
            ans.push(this.accessories.get());
        }
        return ans;
    };
    //Получить все вещи одетые на игрока в одном объекте
    this.getAll = function () {
        return {
            head: this.head,
            body: this.body,
            legs: this.legs,
            shoes: this.shoes,
            bags: this.bags,
            accessories: this.accessories
        };
    };
}

//Можно ли выбрасывать оружие из рук? Учесть этот момент при хранении в инвентаре
//Присваивать игроку только то оружие, которое добавлено в слоты
let Inventory = function () {
    this.objects = new Array();
    this.usedObjects = new UsedObjects();

    this.phone = new Phone();
    this.bank = new Bank();

    this.currentWeight = 0;
    this.weight = 50; // example

    //Выкинуть из рюкзака
    this.remove = function (data) {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i] == data) {
                this.objects.splice(i, 1);
                return data;
            }
        }
    };
    //Снять с игрока и выкинуть
    this.removeUsed = function (player, data) {
        return this.usedObjects.remove(player, data);
    };
    //Положить в рюкзак
    this.add = function (data) {
        // if (data.weight + this.currentWeight <= this.weight) {
            this.objects.push(data);
            return null;
        // }
        // else {
        //     return data;
        // }
    };
    //Одеть/взять в руки
    this.addUsed = function (player, data) {
        // if (data.weight + this.currentWeight <= this.weight) {
            let obj = this.usedObjects.add(player, data);
            if (obj != null) {
                return this.add(obj);
            }
            else {
                return null;
            }
        // }
        // else {
        //     return data;
        // }
    };
    //Одеть/взять в руки из рюкзака
    this.moveToUsed = function (player, data) {
        return this.addUsed(player, this.remove(data));
    };
    //Снять и положить в рюкзак
    this.moveToNotUsed = function (player, data) {
        return this.add(this.removeUsed(player, data));
    };
    //Получить содержимое рюкзака(Array)
    this.getAllNotUsed = function () {
        return this.objects;
    };
    //Получить одетое на игроке(Obj)
    this.getAllUsed = function () {
        return this.usedObjects.getAll();
    };
    this.getByType = function (type) {
        return this.objects.filter(function(item){ return item.getType() = type});
    };
    this.set = function (data, player) {
        if (data.objects != null &&
            data.usedObjects != null &&
            data.phone != null &&
            data.bank != null) {
                for (let i = 0; i < data.objects.length; i++) {
                    if (data.objects[i].type == "clothes") {
                        this.objects.push(new Clothes(data.objects[i].object));
                    }
                }
                this.usedObjects.set(data.usedObjects);
        
                this.phone.set(data.phone, player);
                this.bank.set(data.bank, player);
                // ВЫПОЛНЯТЬ ПЕРЕРАСЧЕТ ПЕРЕНОСИМОГО ВЕСА А ТАК ЖЕ ТЕКУЩЕГО
        }
        else {
            err.throw(player, "Ошибка с загрузкой Inventory");
        }
    };
    //Обновление одетых на персоонажа вещей
    this.updateUsed = function (player) {
        this.usedObjects.update(player);
    }
};

let Bank = function() {
    this.cash = 0;
    this.money = 0;
    this.number = -1;
    //this.payday = 0;

    this.set = function(data, player) {
        if (data.cash != null &&
            data.money != null &&
            data.number != null /*&&
            data.payday != null*/) {
            this.cash = data.cash;
            this.money = data.money;
            this.number = data.number;
            //this.payday = data.payday;
        }
        else {
            err.throw(player, "Ошибка с загрузкой Bank");
        }
    }
};

let Phone = function() {
    this.isHave = false;
    this.number = "";
    this.money = 0;

    this.contacts = new Array();
    this.messagesList = new Array();
    // добавить генерацию номера

    this.addContact = function (name, number) {
        this.contacts.push(new Contact(name, number));
        // update messages names
        for (let i = 0; i < this.messagesList.length; i++) {
            if (this.messagesList[i].number == number) {
                this.messagesList[i].name = name;
            }
        }
    };
    this.renameContact = function (index, name, number) {
        if (index == -1) return;
        let oldNumber = this.contacts[index].number;
        let newName = "";
        this.contacts[index].name = name;
        this.contacts[index].number = number;
        // update messages names
        if (oldNumber == number) {
            newName = name;
        }
        for (let i = 0; i < this.messagesList.length; i++) {
            if (this.messagesList[i].number == number) {
                this.messagesList[i].name = newName;
            }
        }
    };
    this.removeContact = function (number) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].number == number) {
                this.contacts.splice(i, 1);
                return;
            }
        }
    };

    this.newMessage = function (number, message, isMine) {
        let index = this.findDialog(number);
        if (index == -1) {
            let contactIndex = this.findContact(number);
            if (contactIndex == -1) {
                this.messagesList.push(new Dialog("", number));
            }
            else {
                this.messagesList.push(new Dialog(this.contacts[contactIndex].name, number));
            }
        }
        else {
            this.messagesList[index].messages.push(new Message(message, isMine));
        }
    };
    
    this.findDialog = function (num) {
        for (let i = 0; i < this.messagesList.length; i++) {
            if (this.messagesList[i].number == num) {
                return i;
            }
        }
        return -1;
    };
    this.findContact = function (num) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].number == num) {
                return i;
            }
        }
        return -1;
    };

    this.set = function (data, player) {
        if (data.isHave != null &&
            data.number != null &&
            data.money != null &&
            data.contacts != null &&
            data.messagesList != null) {
            this.isHave = data.isHave;
            this.number = data.number;
            this.money = data.money;
            this.contacts = data.contacts;
            this.messagesList = data.messagesList;
        }
        else {
            err.throw(player, "Ошибка с загрузкой Phone");
        }
    }
};
let Contact = function(name, number) {
    this.name = name;
    this.number = number;
};
let Dialog = function(name, number) {
    this.name = name;
    this.number = number;
    this.messages = new Array();
};
let Message = function(text, isMine) {
    this.text = text;
    this.isMine = isMine;
};

module.exports.Player = function () {
    this.auth = false;
    this.charChoosed = false;
    
    this.ip = "";
    this.serial = "";
    this.socialClub = "";

    this.personId = 0;
    //players
    this.login = "";
    this.password = "";
    this.email = "";
    this.coins = 0;
    this.accountNumber = null;

    //playersInfo
    this.number = -1;
    this.mainInfo = new MainInfo();
    this.customization = new Customization();
    this.inventory = new Inventory();

    this.set = function (objects, player) {
        if (objects.mainInfo != null &&
            objects.customization != null &&
            objects.inventory != null &&
            objects.number != null) {
            this.personId = objects.personId;
            this.mainInfo.set(objects.mainInfo, player);
            this.customization.set(objects.customization, player);
            this.inventory.set(objects.inventory, player);
            this.number = objects.number;
        }
        else {
            err.throw(player, "Ошибка с загрузкой PlayerInfo");
        }
    };
    this.get = function () {
        return {
            personId: this.personId,
            number: this.number,
            mainInfo: this.mainInfo,
            customization: this.customization,
            inventory: this.inventory
        };
    };
    this.getWithoutNumber = function () {
        return {
            mainInfo: this.mainInfo,
            customization: this.customization,
            inventory: this.inventory
        };
    }
};

//!!!Важно!!!
//Элементы в инвентаре при использовании методов для добавления в инвентарь определенной вещи, 
//использовать только описанные ниже классы в которые помещается соответствующие предметы
let Clothes = function (object) {
    this.type = "clothes";
    this.object = object;
    this.set = function (data) {
        this.object = data;
    };
    this.get = function () {
        return this.object;
    };
    this.getType = function () {
        return this.type;
    };
    this.getCategory = function () {
        return this.object[2];
    };
    this.getPrice = function () {
        return this.object[5];
    };
    this.getWeight = function () {
        return 0.3;
    };
    this.getName = function () {
        return this.object[4];
    };
};
module.exports.Clothes = Clothes;