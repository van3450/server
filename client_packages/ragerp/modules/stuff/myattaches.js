require('./ragerp/modules/attach-sync/attach-sync.js');

mp.attachmentMngr.register("takePhone", "prop_npc_phone", 58867, new mp.Vector3(0.06, 0.04, 0.01), new mp.Vector3(-15, 0, -145));
mp.attachmentMngr.register("callPhone", "prop_npc_phone", 58867, new mp.Vector3(0.01, 0.05, -0.02), new mp.Vector3(-5, -65, 165));

mp.events.add('takePhone.client', () => {
    mp.attachmentMngr.addLocal("takePhone");
});



mp.events.add('callPhone.client', () => {
    mp.attachmentMngr.removeLocal("takephone")
    mp.attachmentMngr.addLocal("callPhone");
   
});
