"use strict";

mp.events.add('getUsed.server', (player) => {
    player.call('getUsedAns.client', [player.info.inventory.getAllUsed()]);
});

mp.events.add('getNotUsed.server', (player) => {
    player.call('getNotUsedAns.client', [player.info.inventory.getAllNotUsed()]);
});

// В каждый вызов функции связанной с инвентарем необходимо передавать объект, который
// будет перемещен, выкинут, надет и т.д.
// Любая функция что то возвращает. Объект или null(одно из двух может означать ошибку в некоторых случаях)

// addUsed вернуло 
// null = объект надет и если был объект такого же типа, то он перемещен в инвентарь
// object = объект надет и если был объект такого же типа и его не удалось поместить в инвентарь он возвращаеся данной функцией
mp.events.add('addUsed.server', (player, obj) => {
    player.call('addUsedAns.client', [player.info.inventory.addUsed(player, obj)]);
});

// add вернуло 
// null = объект успешно добавлен в инвентарь
// object = для объекта не хватило места в инвентаре
mp.events.add('addNotUsed.server', (player, obj) => {
    player.call('addNotUsedAns.client', [player.info.inventory.add(obj)]);
});

// moveToUsed вернуло 
// null = объект успешно перемещен
// object = ошибка(по логике невозможно)
mp.events.add('moveUsed.server', (player, obj) => {
    player.call('moveUsedAns.client', [player.info.inventory.moveToUsed(player, obj)]);
});

// moveToNotUsed вернуло 
// null = объект успешно перемещен
// object = ошибка(по логике невозможно)
mp.events.add('moveNotUsed.server', (player, obj) => {
    player.call('moveNotUsedAns.client', [player.info.inventory.moveToNotUsed(player, obj)]);
});

// removeUsed вернуло 
// null = ошибка(по логике невозможно)
// object = объект снят с игрока
mp.events.add('removeUsed.server', (player, obj) => {
    player.call('removeUsedAns.client', [player.info.inventory.removeUsed(player, obj)]);
});

// remove вернуло 
// null = ошибка(по логике невозможно)
// object = объект извлечен из рюкзака
mp.events.add('removeNotUsed.server', (player, obj) => {
    player.call('removeNotUsedAns.client', [player.info.inventory.remove(obj)]);
});