const checkMusic = require('./music-alert');

client.once('ready', () => {
    console.log('Bot listo');

    checkMusic(client);
});