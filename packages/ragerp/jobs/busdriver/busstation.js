var buses = require('./bus.json');
var stops = require('./stops.json');
var vehicles = require('../../vehicle-system/spawn.js');

mp.blips.new(513, new mp.Vector3(452.52, -638.28, 0),
    {
        name: 'Стоянка автобусов',
        color: 4,
        shortRange: true,
});

buses.forEach((bus) => {
    vehicles.spawnVehicle(bus.model, "BUS", bus.position, bus.heading, bus.color, bus.scolor);
});

stops.forEach((stop) => {
    mp.labels.new(`Автобусная остановка \n ~y~${stop.name}`, new mp.Vector3(stop.vector[0], stop.vector[1], stop.vector[2]+2),
    {
        los: false,
        font: 0,
        drawDistance: 15,
    });
});