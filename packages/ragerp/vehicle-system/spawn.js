function spawnVehicle(model, key, position, heading, color, scolor) {
    let vehicle = mp.vehicles.new(model, new mp.Vector3(position[0], position[1], position[2]),
    {
        heading: heading
    });
    vehicle.setColor(color, scolor);
    vehicle.spawnPosition = position;
    vehicle.spawnHeading = heading;
    vehicle.key = key;

    return vehicle;
}

function respawnVehicle(vehicle) {
    if (vehicle.textLabel) textLabel = null;
    spawnVehicle(vehicle.model, vehicle.key, vehicle.spawnPosition, vehicle.spawnHeading, vehicle.getColor(0), vehicle.getColor(1));
    vehicle.destroy();
}
module.exports.spawnVehicle = spawnVehicle;
module.exports.respawnVehicle = respawnVehicle;