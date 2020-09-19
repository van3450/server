"use strict";
let db = require('../db/db');


let numbers = new Array();


(function () {
    db.findNumbers({}, function(ans){
        if (ans.length > 0) {
            numbers = ans;
        }
    });
})();


module.exports.isExistPhoneNumber = function(number) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].phoneNumber == number) return true
    };
    return false;
}