"use strict";

let callerId = -1;
const Use3d = true;
const UseAutoVolume = false;
const MaxRange = 50.0;

mp.events.add('charChoosed.client', function() {
	mp.keys.bind(0x55, true, function() {		// U
		//if (mp.gui.cursor.visible) return;
		mp.voiceChat.muted = false;
		//temp
		//mp.gui.chat.push("Voice Chat: enabled");
	});

	mp.keys.bind(0x55, false, function() {		// U
		
		mp.voiceChat.muted = true;
		//temp
		//mp.gui.chat.push("Voice Chat: disabled");
	});
});



let g_voiceMgr = {
	listeners: [],
	
	add: function(player) {
		this.listeners.push(player);
		
		player.isListening = true;		
		mp.events.callRemote("addVoice.server", player);
		
		if(UseAutoVolume) {
			player.voiceAutoVolume = true;
		}
		else {
			player.voiceVolume = 1.0;
		}
		
		if(Use3d) {
			player.voice3d = true;
		}
	},
	
	remove: function(player, notify) {
		let idx = this.listeners.indexOf(player);
			
		if(idx !== -1)
			this.listeners.splice(idx, 1);
			
		player.isListening = false;
		
		if(notify) {
			mp.events.callRemote("removeVoice.server", player);
		}
	}
};

mp.events.add("playerQuit", (player) => {
	if(player.isListening) {
		g_voiceMgr.remove(player, false);
	}
});

mp.events.add('playerTalkByPhone.client', (callerIdTemp) => {
	callerId = callerIdTemp;
	if(!mp.players.atRemoteId(callerId).isListening) {
		g_voiceMgr.add(mp.players.atRemoteId(callerId));
	}
	mp.players.atRemoteId(callerId).voiceVolume = 1;
	mp.players.atRemoteId(callerId).voice3d = false;
});

mp.events.add('playerStopTalkByPhone.client', () => {
	g_voiceMgr.remove(mp.players.atRemoteId(callerId), true);
	callerId = -1;
});

setInterval(() => {
	let localPlayer = mp.players.local;
	let localPos = localPlayer.position;
	mp.players.forEachInStreamRange(player => {
		if(player != localPlayer && localPlayer.dimension == player.dimension) {
			if (player.remoteId != callerId) {
				if(!player.isListening) {
					const playerPos = player.position;		
					let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
					
					if(dist <= MaxRange) {
						g_voiceMgr.add(player);
					}
				}
			}
		}
	});
	
	g_voiceMgr.listeners.forEach(player => {
		if(player.handle !== 0) {
			if (player.remoteId != callerId) {
				const playerPos = player.position;		
				let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
				
				if(dist > MaxRange) {
					g_voiceMgr.remove(player, true);
				}
				else if(!UseAutoVolume) {
					player.voiceVolume = 1 - (dist / MaxRange);
				}
			}
		}
		else {
			g_voiceMgr.remove(player, true);
		}
	});
}, 500);