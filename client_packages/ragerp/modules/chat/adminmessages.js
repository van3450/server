mp.events.add('showAdminCommands.client', (lvl, commands) => {
    message = `!{#ffbd60}${lvl} уровень: ${commands}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('adminAnswer.client', (adminName, adminId, targetName, targetId, message) => {
    message = `!{#f29f53}[A] ${adminName}[${adminId}] для ${targetName}[${targetId}]: ${message.join(' ')}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('adminChatAction.client', (message, adminName, adminId, targetName, targetId) => {
    message = `!{#dbdbdb}[A] ${adminName}[${adminId}] ${message} ${targetName}[${targetId}]`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('adminChat.client', (nickname, id, message) => {
    message = `!{#b5e865}[A] ${nickname}[${id}]: ${message.join(' ')}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('msgChat.client', (nickname, id, message) => {
    message = `!{#ebc71b}Администратор ${nickname}[${id}]: ${message.join(' ')}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('kickMessage.client', (adminName, adminId, targetName, targetId, message) => {
    message = `!{#db5e4a}Администратор ${adminName}[${adminId}] кикнул игрока ${targetName}[${targetId}]: ${message.join(' ')}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('showErrorMessage.client', (message) => {
    message = `!{#afafae}Ошибка: ${message}`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('showClosedConnection.client', () => {
    message = `!{#a9c4e4}Сервер закрыл соединение.`;
    mp.events.call('pushChatMessage.client', message);
});

mp.events.add('showAdminList.client', (admins) => {
    mp.events.call('pushChatMessage.client', '!{#66cc00}Администраторы в сети:');
        admins.forEach(function (current, i, admins) {
        mp.events.call('pushChatMessage.client', `!{#ebc71b}${current.nickname}[${current.id}] (${current.lvl} уровень)`);
    });
});


mp.events.add('getRot.client', () => {
    mp.events.call('pushChatMessage.client',  `${mp.players.local.getHeading().toString()}`); 
});

