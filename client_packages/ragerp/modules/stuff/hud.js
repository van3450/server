const useSpeedo = true;
const updateInterval = 1000; // milliseconds, lower value = more accurate, at the cost of performance

const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};

let streetName = null;
let zoneName = null;
let minimap = {};


function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}

function drawText(text, drawXY, font, color, scale, alignRight = false) {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke(Natives.SET_TEXT_OUTLINE);

    if (alignRight) {
        mp.game.ui.setTextRightJustify(true);
        mp.game.ui.setTextWrap(0, drawXY[0]);
    }

    mp.game.ui.drawText(drawXY[0], drawXY[1]);
}

function getDirection() {
    let direction;
    if (mp.players.local.getHeading() < 22.5 || mp.players.local.getHeading() >= 337.5) {
        direction = 'N';
    } else if (mp.players.local.getHeading() < 67.5 && mp.players.local.getHeading() >= 22.5) {
        direction = 'NW';
    } else if (mp.players.local.getHeading() < 112.5 && mp.players.local.getHeading() >= 67.5) {
        direction = 'W';
    } else if (mp.players.local.getHeading() < 157.5 && mp.players.local.getHeading() >= 112.5) {
        direction = 'WS';
    } else if (mp.players.local.getHeading() < 202.5 && mp.players.local.getHeading() >= 157.5) {
        direction = 'S';
    } else if (mp.players.local.getHeading() < 247.5 && mp.players.local.getHeading() >= 202.5) {
        direction = 'SE';
    } else if (mp.players.local.getHeading() < 292.5 && mp.players.local.getHeading() >= 247.5) {
        direction = 'E';
    } else if (mp.players.local.getHeading() < 337.5 && mp.players.local.getHeading() >= 292.5) {
        direction = 'NE';
    }
    return direction;
}
setInterval(() => {
    // only do stuff if radar is enabled and visible
    if (mp.game.invoke(Natives.IS_RADAR_ENABLED) && !mp.game.invoke(Natives.IS_RADAR_HIDDEN)) {
        isMetric = mp.game.gameplay.getProfileSetting(227) == 1;
        minimap = getMinimapAnchor();

        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        //if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
    } else {
        streetName = null;
        zoneName = null;
    }
}, updateInterval);

mp.events.add("render", () => {
    
    if (streetName && zoneName) {
        switch (getDirection()) {
            case 'NW':
                drawText(getDirection(), [minimap.rightX + 0.01, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'W':
                drawText(getDirection(), [minimap.rightX + 0.017, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'WS':
                drawText(getDirection(), [minimap.rightX + 0.012, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'S':
                drawText(getDirection(), [minimap.rightX + 0.022, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'SE':
                drawText(getDirection(), [minimap.rightX + 0.014, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'E':
                drawText(getDirection(), [minimap.rightX + 0.022, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'NE':
                drawText(getDirection(), [minimap.rightX + 0.014, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
            case 'N':
                drawText(getDirection(), [minimap.rightX + 0.02, minimap.bottomY - 0.075], 4, [255, 255, 255, 255], 1.35);
                break;
        }
        drawText(streetName, [minimap.rightX + 0.055, minimap.bottomY - 0.065], 4, [255, 255, 255, 255], 0.55);
        drawText(`~y~${zoneName}`, [minimap.rightX + 0.055, minimap.bottomY - 0.035], 4, [255, 255, 255, 255], 0.5);
        }
});