"use strict";
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

//-----------------------------------------------------------------------ПОИСК
module.exports.findOne = function(condition, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("players");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result[0]);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по players]\n" + error);
    }); 
}

module.exports.findPlayersInfo = function(condition, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("playersinfo");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по playersinfo]\n" + error);
    }); 
}

module.exports.findBiz = function(condition, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("biz");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по biz]\n" + error);
    }); 
}

module.exports.findHouse = function(condition, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("house");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по house]\n" + error);
    }); 
}

//--------------------------Чтение номеров телефонов из бд
module.exports.findNumbers = function(condition, callback) {
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("numbers");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по numbers]\n" + error);
    }); 
}

//--------------------------Чтение номера последнего зарегестрированного аккаунта
module.exports.findAccountNumbers = function(condition, callback) {
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("accountnumbers");
            if(err) reject(err);
            collection.find(condition).toArray((err, result) => {
                if(err) reject(err);
                resolve(result[0]);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в поиске по accountnumbers]\n" + error);
    }); 
}

//-----------------------------------------------------------------------ВСТАВКА
module.exports.insert = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("players");
            if(err) reject(err);
            collection.insertMany(data, (err, result) => {
                if(err) reject(err);

                const collectionNum = db.collection("accountnumbers");
                collectionNum.findOneAndUpdate({accNumObj: -1}, {$set: {accountNumbers: data[0].accountNumber}}, (err, result) => {
                    if(err) reject(err);
                    resolve();
                    client.close();
                });
            });
        });
    });
    promise.then(function (){
        callback();
    }).catch(function (error){
        console.log("[Ошибка во вставке в players]\n" + error);
    }); 
}

module.exports.insertPlayersInfo = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("playersinfo");
            if(err) reject(err);
            collection.insertMany(data, (err, result) => {
                if(err) reject(err);
                resolve();
                client.close();
            });
        });
    });
    promise.then(function (){
        callback();
    }).catch(function (error){
        console.log("[Ошибка во вставке в playersinfo]\n" + error);
    }); 
}

module.exports.insertBiz = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("biz");
            if(err) reject(err);
            collection.insertMany(data, (err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка во вставке в biz]\n" + error);
    }); 
}

module.exports.insertHouse = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("house");
            if(err) reject(err);
            collection.insertMany(data, (err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка во вставке в house]\n" + error);
    }); 
}

module.exports.insertNumbers = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("numbers");
            if(err) reject(err);
            collection.insertOne(data, (err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result) {
        callback(result);
    }).catch(function (error) {
        console.log("[Ошибка во вставке в numbers]\n" + error);
    }); 
}

module.exports.insertAccountNumbers = function(data, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("accountnumbers");
            if(err) reject(err);
            collection.insertOne(data, (err, result) => {
                if(err) reject(err);
                resolve(result);
                client.close();
            });
        });
    });
    promise.then(function (result) {
        callback(result);
    }).catch(function (error) {
        console.log("[Ошибка во вставке в accountnumbers]\n" + error);
    }); 
}



//-----------------------------------------------------------------------ОБНОВЛЕНИЕ
module.exports.updatePlayersInfo = function(obj, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("playersinfo");
            console.log("connected to collection");
            if(err) reject(err);
            if (obj.length != 0) {
                updatePlayersInfoRec(obj, resolve, reject, collection);
            }
        });
    });
    promise.then(function (result){
        callback(result);
    }).catch(function (error){
        console.log("[Ошибка в обновлении playersinfo]\n" + error);
    }); 
};

var updatePlayersInfoRec = function (obj, resolve, reject, collection) {
    let elem = obj.pop();
    collection.findOneAndUpdate(elem.condition, elem.data, (err, result) => {
        if(err) reject(err);
        if (obj.length != 0) {
            updatePlayersInfoRec(obj, resolve, reject, collection);
        }
        else {
            resolve(result);
        }
        client.close();
    });
};
//--------------------------------------------------//

module.exports.updateBiz = function(obj, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("biz");
            if(err) reject(err);
            if (obj.length != 0) {
                updateBizRec(obj, resolve, reject, collection);
            }
        });
    });
    promise.then(function (){
        callback();
    }).catch(function (error){
        console.log("[Ошибка в обновлении biz]\n" + error);
    }); 
}

var updateBizRec = function (obj, resolve, reject, collection) {
    let elem = obj.pop();
    collection.findOneAndUpdate(elem.condition, elem.data, (err, result) => {
        if(err) reject(err);
        if (obj.length != 0) {
            updateBizRec(obj, resolve, reject, collection);
        }
        else {
            resolve();
        }
        client.close();
    });
}
//--------------------------------------------------//

module.exports.updateHouse = function(obj, callback){
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("house");
            if(err) reject(err);
            if (obj.length != 0) {
                updateHouseRec(obj, resolve, reject, collection);
            }
        });
    });
    promise.then(function (){
        callback();
    }).catch(function (error){
        console.log("[Ошибка в обновлении house]\n" + error);
    }); 
}

var updateHouseRec = function (obj, resolve, reject, collection) {
    let elem = obj.pop();
    collection.findOneAndUpdate(elem.condition, elem.data, (err, result) => {
        if(err) reject(err);
        if (obj.length != 0) {
            updateHouseRec(obj, resolve, reject, collection);
        }
        else {
            resolve();
        }
        client.close();
    });
}


module.exports.updateAccountNumbers = function(data) {
    let promise = new Promise((resolve, reject) => {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("ragedb");
            const collection = db.collection("accountnumbers");
            if(err) reject(err);
            collection.findOneAndUpdate({accNumObj: -1}, data, (err, result) => {
                if(err) reject(err);
                resolve();
                client.close();
            });
        });
    });
    promise.then(function (){

    }).catch(function (error){
        console.log("[Ошибка в обновлении accountnumbers]\n" + error);
    }); 
}
