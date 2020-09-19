"use strict";
var routes = require('./routes.json');
var stops = require('./stops.json');
var fs = require('fs');

var newRoute = {
    "points": []
}

mp.events.add('/route', (player) => {

    player.call('pushChatMessage.client', [`Запущен создатель маршрутов`]);
    player.call('pushChatMessage.client', [`/cp - обычный чекпоинт`]);
    player.call('pushChatMessage.client', [`/stop - остановка`]);
});


mp.events.add('/cp', (player) => {
    newRoute.points.push({
        "vector": [player.position.x, player.position.y, player.position.z]
    });
    player.call('pushChatMessage.client', [`Создали: ${player.position.x} ${player.position.y} ${player.position.z}`]);
});

mp.events.add('/stop', (player) => {
    newRoute.points.push({
        "vector": [player.position.x, player.position.y, player.position.z],
        "type": "stop"
    });
    player.call('pushChatMessage.client', [`Создали: ${player.position.x} ${player.position.y} ${player.position.z}`]);
});

mp.events.add('/newstop', (player, args) => {
    stops.push({
        "name": args.join(' '),
        "vector": [player.position.x, player.position.y, player.position.z]
    });
    player.call('pushChatMessage.client', [`Остановка: ${player.position.x} ${player.position.y} ${player.position.z}`]);
});


mp.events.add('/showr', (player) => {
    newRoute.points.forEach((current) =>{
        player.call('pushChatMessage.client', [`Создали: ${current.vector[0]} ${current.vector[1]} ${current.vector[2]}`]);
    });
   
});


mp.events.add('/save', (player) => {
    routes.push(newRoute);

    fs.writeFile ("packages/ragerp/jobs/busdriver/routes.json", JSON.stringify(routes), function(err) {
        if (err) throw console.log(err);
        console.log('complete');
        }
    );
   
});

mp.events.add('/savestops', (player) => {
    fs.writeFile ("packages/ragerp/jobs/busdriver/stops.json", JSON.stringify(stops), function(err) {
        if (err) throw console.log(err);
        console.log('complete stops');
        }
    );
   
});