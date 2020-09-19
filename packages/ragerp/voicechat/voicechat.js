"use strict";

mp.events.add("addVoice.server", (player, target) =>
{
	if(target)
	{
		player.enableVoiceTo(target);
	}
});

mp.events.add("removeVoice.server", (player, target) =>
{
	if(target)
	{
		player.disableVoiceTo(target);
	}
});