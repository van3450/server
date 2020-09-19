mp.events.add('createSyncedLabel.server', (player, vehicle, text) => {
    vehicle.setVariable('labelText', text);
});