"use strict";


mp.events.add('charChoose.server', function (player, charnumber, place) {
    if (!player.info.auth) {
        player.call('charChooseAns.client', [0]);
        return;
    }
    if (charnumber == null || isNaN(charnumber) || isNaN(place)) {
        player.call('charChooseAns.client', [0]);
        return;
    }
    if (charnumber < 0 || charnumber > 2) {
        player.call('charChooseAns.client', [0]);
        return;
    }
    if (player.charactersInfo[charnumber].mainInfo.created) {
        player.info.set(player.charactersInfo[charnumber].get());
        player.charactersInfo = null;
        mp.events.call('loadCharacter.server', player);

        if (place == 0) {
            player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        }
        else if (place == 1) {
            player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        }
        else if (place == 2) {
            player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        }
        player.call('charChooseAns.client', [1]);
        mp.events.call('charChoosed.server', player);
    }
    else {
        player.call('charChooseAns.client', [1]);
        player.info.set(player.charactersInfo[charnumber].get());
        mp.events.call('charCreator.server', player);
    }
});