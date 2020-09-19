mp.events.add('render', () => {
    mp.vehicles.forEachInStreamRange((vehicle) => {
        if (vehicle.getVariable('labelText')) {
            let label = vehicle.getVariable('labelText');
            if (label.type == 'bus') {

                let text = (label.price == 0) ? `~y~${label.route} \n~g~Проезд бесплатный` : `~y~${label.route} \n ~w~Стоимость проезда: ~g~$${label.price}`;

                mp.game.graphics.drawText(text, [vehicle.position.x, vehicle.position.y, vehicle.position.z + 2.7], {
                    font: 0,
                    color: [255, 255, 255, 255],
                    scale: [0.35, 0.35],
                    outline: true,
                    centre: true
                });
            }
        }
    });
});

