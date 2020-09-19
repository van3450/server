'use strict';
const Data = require('./ragerp/modules/charcreator/data.js');
const ui = require("./ragerp/browser/index.js");

const freemodeCharacters = [mp.game.joaat("mp_m_freemode_01"), mp.game.joaat("mp_f_freemode_01")];
const localPlayer = mp.players.local;

let charData;

let headCreatorCamera;
let creatorCamera;
function camInit() {
    let mainCamera = {
        camera: new mp.Vector3(localPlayer.position.x, localPlayer.position.y - 0.55, localPlayer.position.z + 0.675),
        cameraLookAt: new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z + 0.675)
    };
    headCreatorCamera = mp.cameras.new("headCamera", mainCamera.camera, new mp.Vector3(0, 0, 0), 45);
    headCreatorCamera.pointAtCoord(mainCamera.cameraLookAt);


    let torsoCamera;
    torsoCamera = {
        camera: new mp.Vector3(localPlayer.position.x, localPlayer.position.y - 1.25, localPlayer.position.z + 0.5),
        cameraLookAt: new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z + 0.5)
    };
    creatorCamera = mp.cameras.new("creatorCamera", torsoCamera.camera, new mp.Vector3(0, 0, 0), 45);
    creatorCamera.pointAtCoord(torsoCamera.cameraLookAt);
}

function applyTorsoCamera() {
    creatorCamera.setActive(true);
    headCreatorCamera.setActive(false);
}

function applyMainCamera() { 
    headCreatorCamera.setActive(true);
    creatorCamera.setActive(false);
}

function showTorso(state) {
    if (state) {
        if (charData.Gender == 0) {
            localPlayer.setComponentVariation(3, 15, 0, 2);
            localPlayer.setComponentVariation(8, 15, 0, 2);
            localPlayer.setComponentVariation(11, 15, 0, 2);
        } else {
            localPlayer.setComponentVariation(3, 15, 0, 2);
            localPlayer.setComponentVariation(8, 2, 0, 2);
            localPlayer.setComponentVariation(11, 18, 0, 2);
        }
    } else {
        if (charData.Gender == 0) {
            localPlayer.setComponentVariation(3, 0, 0, 2);
            localPlayer.setComponentVariation(8, 15, 0, 2);
            localPlayer.setComponentVariation(11, 0, 0, 2);
        } else {
            localPlayer.setComponentVariation(3, 0, 0, 2);
            localPlayer.setComponentVariation(8, 2, 0, 2);
            localPlayer.setComponentVariation(11, 0, 0, 2);
        }
    }
    
}

function setDefWear() {
    if (charData.Gender == 0) {
        localPlayer.setComponentVariation(3, 0, 0, 2);
        localPlayer.setComponentVariation(8, 15, 0, 2);
        localPlayer.setComponentVariation(11, 0, 0, 2);
        localPlayer.setComponentVariation(6, 1, 0, 2);
        localPlayer.setComponentVariation(4, 0, 0, 2);
    } else {
        localPlayer.setComponentVariation(3, 0, 0, 2);
        localPlayer.setComponentVariation(8, 2, 0, 2);
        localPlayer.setComponentVariation(11, 0, 0, 2);
        localPlayer.setComponentVariation(6, 1, 0, 2);
        localPlayer.setComponentVariation(4, 0, 0, 2);
    }
}

function colorForOverlayIdx(index) {
    let color;

    switch (index) {
        case 1:
            color = charData.BeardColor;
            break;

        case 2:
            color = charData.EyebrowColor;
            break;

        case 5:
            color = charData.BlushColor;
            break;

        case 8:
            color = charData.LipstickColor;
            break;

        case 10:
            color = charData.ChestHairColor;
            break;

        default:
            color = 0;
    }
    return color;
}

function updateParents() {
    localPlayer.setHeadBlendData(
        // shape
        charData.Parents.Mother,
        charData.Parents.Father,
        0,

        // skin
        0,
        charData.Parents.Skin,
        0,

        // mixes
        charData.Parents.Similarity,
        1.0,
        0.0,

        false
    );
}

let deltaRot = 30;
let rotateLeft = function() { 
    let newHeading = localPlayer.getHeading() - deltaRot;
    if (newHeading < 0) {
        newHeading = 360 - deltaRot;
    }
    localPlayer.setRotation(0, 0, newHeading, 0, true);
    localPlayer.position = localPlayer.position;
}
let rotateRight = function() { 
    let newHeading = localPlayer.getHeading() + deltaRot;
    if (newHeading > 360) {
        newHeading = deltaRot;
    }
    localPlayer.setRotation(0, 0, newHeading, 0, true);
    localPlayer.position = localPlayer.position;
}

function binding(active) {
    if (active) {
        mp.keys.bind(0x44, true, rotateRight);   // D
        mp.keys.bind(0x41, true, rotateLeft);    // A
    }
    else {
        mp.keys.unbind(0x44, true, rotateRight);
        mp.keys.unbind(0x41, true, rotateLeft);
    }
}

mp.events.add('charCreatorContinue.client', () => {
    binding(false);
});

mp.events.add('charCreatorBack.client', () => {
    binding(true);
});

mp.events.add('setNick.client', (name, surname) => {
    mp.events.callRemote('setNick.server', `${name} ${surname}`, JSON.stringify(charData));
});

mp.events.add('setNickAns.client', (ans) => {
    ui.callCEF('checkCustom', [ans]);
    if (ans == 1) {
        mp.events.call('charCreator.client', false);
    }
});

mp.events.add("charCreator.client", (active, rawCharData) => {
    if (active) {
        binding(true);
        charData = JSON.parse(rawCharData);
        mp.gui.cursor.show(true, false);

        camInit();
        applyTorsoCamera();
        
        ui.callCEF('showCustomization', []);
    } else {
        mp.gui.cursor.show(true, true);
        mp.events.callRemote('charCreatorPlayerExit.server');
    }
});

mp.events.add("headCreator.client", (active) => {
    showTorso(false);
    if (active) {
        applyMainCamera();
    }
    else {
        applyTorsoCamera();
    }
});

mp.events.add('charCreatorReset.client', () => {
    if (charData.Gender == 0) {
        charData.Parents.Similarity = 1;
    }
    else {
        charData.Parents.Similarity = 0;
    }
    charData.Parents.Mother = 21;
    charData.Parents.Father = 0;
    charData.Parents.Skin = 0;
    updateParents();
    applyTorsoCamera();
});

mp.events.add('setGender.client', gender => {
    charData.Gender = parseInt(gender);
    if (charData.Gender == 0 || charData.Gender == 1) {
        mp.players.local.model = freemodeCharacters[charData.Gender];
    }
    if (charData.Gender == 0) {
        charData.Parents.Similarity = 1;
    }
    else {
        charData.Parents.Similarity = 0;
    }
    charData.Parents.Mother = 21;
    charData.Parents.Father = 0;
    charData.Parents.Skin = 0;
    updateParents();
    applyTorsoCamera();
    setDefWear();
});


//Hair events
mp.events.add('setHairstyle.client', hairStyleId => {
    hairStyleId = parseInt(hairStyleId);
    if (charData.Gender === 0) {
        if (hairStyleId >= 0 && hairStyleId <= Data.hairList[0].length) {
            charData.Hair.Hair = Data.hairList[0][hairStyleId].ID;
            localPlayer.setComponentVariation(2, charData.Hair.Hair, 0, 2);
        }
    } else if (charData.Gender === 1) {
        if (hairStyleId >= 0 && hairStyleId <= Data.hairList[1].length) {
            charData.Hair.Hair = Data.hairList[1][hairStyleId].ID;
            localPlayer.setComponentVariation(2, charData.Hair.Hair , 0, 2);
        }
    }
});

mp.events.add('setHairColor.client', colorId => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxHairColor) {
        charData.Hair.Color = colorId;
        localPlayer.setHairColor(colorId, charData.Hair.HighlightColor);
    }
});

mp.events.add('setHairHighlightColor.client', (highlightColorId) => {
    highlightColorId = parseInt(highlightColorId);
    if (highlightColorId >= 0 && highlightColorId <= Data.maxHairColor) {
        charData.Hair.HighlightColor = highlightColorId;
        localPlayer.setHairColor(charData.Hair.Color, highlightColorId);
    }
});

mp.events.add('setEyebrowColor.client', (colorId) => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxHairColor) {
        charData.EyebrowColor = colorId;
        localPlayer.setHeadOverlayColor(2, 1, colorId, 0);
    }
});

mp.events.add('setFacialHairColor.client', (colorId) => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxHairColor) {
        charData.BeardColor = colorId;
        localPlayer.setHeadOverlayColor(1, 1, colorId, 0);
    }
});

mp.events.add('setEyeColor.client', (colorId) => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxEyeColor) {
        charData.EyeColor = colorId;
        localPlayer.setEyeColor(colorId);
    }
});

mp.events.add('setBlushColor.client', (colorId) => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxBlushColor) {
        charData.BlushColor = colorId;
        localPlayer.setHeadOverlayColor(5, 2, colorId, 0);
    }
});

mp.events.add('setLipstickColor.client', (colorId) => {
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxLipstickColor) {
        charData.LipstickColor = colorId;
        localPlayer.setHeadOverlayColor(8, 2, colorId, 0);
    }
});

mp.events.add('setChestHairColor.client', colorId => {
    applyTorsoCamera();
    showTorso(true);
    colorId = parseInt(colorId);
    if (colorId >= 0 && colorId <= Data.maxHairColor) {
        charData.ChestHairColor = colorId;
        localPlayer.setHeadOverlayColor(10, 1, colorId, 0);
    }
});

//Parents events
mp.events.add('setMother.client', motherId => {
    motherId = parseInt(motherId);
    if (Data.mothers.includes(motherId)) {
        charData.Parents.Mother = motherId;
        updateParents();
    }
});

mp.events.add('setFather.client', fatherId => {
    fatherId = parseInt(fatherId);
    if (Data.fathers.includes(fatherId)) {
        charData.Parents.Father = fatherId;
        updateParents();
    }
});


mp.events.add('setSimilarity.client', value => {
    value = parseInt(value);
    if (value >= 0 && value <= 100) {
        charData.Parents.Similarity = value * 0.01;
        updateParents();
    }
});

mp.events.add('setSkin.client', value => {
    value = parseInt(value);
    if (value >= 0 && value <= 10) {
        charData.Parents.Skin = value;
        updateParents();
    }
});


const FACE_FETURE_STEP = 0.1;

//FaceFeatures events
for (let i = 0; i < Data.faceFeaturesNames.length; i++) {
    const eventName = `set${Data.faceFeaturesNames[i].replace(' ', '')}.client`;
    if ('setNoseBroken.client' == eventName) {
        mp.events.add(eventName, value => {
            value = 20 - value;
            applyMainCamera();
            showTorso(false);
            value = parseInt(value);
            const valueScale = value * FACE_FETURE_STEP - 1;
            if (valueScale >= -1 && valueScale <= 1) {
                charData.Features[i] = valueScale;
                localPlayer.setFaceFeature(i, valueScale);
            }
        });
    }
    else {
        mp.events.add(eventName, value => {
            applyMainCamera();
            showTorso(false);
            value = parseInt(value);
            const valueScale = value * FACE_FETURE_STEP - 1;
            if (valueScale >= -1 && valueScale <= 1) {
                charData.Features[i] = valueScale;
                localPlayer.setFaceFeature(i, valueScale);
            }
        });
    }
}

//HeadOverlays events
for (let i = 0; i < Data.headOverlays.length; i++) {
    const eventName = `set${Data.headOverlays[i].replace(' ', '')}.client`;
    mp.events.add(eventName, (value, chest) => {
        if (chest) {
            applyTorsoCamera();
            showTorso(true);
        }
        else {
            applyMainCamera();
            showTorso(false);
        }
        value = parseInt(value);
        const opacityScale = 1.0;
        if (opacityScale >= 0 && opacityScale <= 1 && value >= 0 && value <= Data.headOverlayItems[i].length) {
            value--;
            charData.Appearance[i] = {
                value: value,
                opacity: opacityScale
            };
            localPlayer.setHeadOverlay(i, value, opacityScale, colorForOverlayIdx(i), 0);
        }
    });
}