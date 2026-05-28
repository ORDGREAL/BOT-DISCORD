const Parser = require('rss-parser');
const parser = new Parser();

const spotifyFeed =
'https://rsshub.app/spotify/artist/2tCQ7pWQsFKGDhIURyh4da';

const soundcloudFeed =
'https://rsshub.app/soundcloud/user/syxtenxiv610';

let lastSpotify = null;
let lastSoundcloud = null;

async function checkMusic(client) {

    const channel = await client.channels.fetch('1509307179109318686');

    // SPOTIFY
    setInterval(async () => {

        try {

            const feed = await parser.parseURL(spotifyFeed);

            const newest = feed.items[0];

            if (newest && newest.title !== lastSpotify) {

                lastSpotify = newest.title;

                channel.send(
`🎵 Nueva canción en Spotify!

**${newest.title}**

${newest.link}`
                );
            }

        } catch (err) {
            console.error('Spotify error:', err);
        }

    }, 60000);

    // SOUNDCLOUD
    setInterval(async () => {

        try {

            const feed = await parser.parseURL(soundcloudFeed);

            const newest = feed.items[0];

            if (newest && newest.title !== lastSoundcloud) {

                lastSoundcloud = newest.title;

                channel.send(
`☁️ Nueva canción en SoundCloud!

**${newest.title}**

${newest.link}`
                );
            }

        } catch (err) {
            console.error('SoundCloud error:', err);
        }

    }, 60000);
}

module.exports = checkMusic;