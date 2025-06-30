require('dotenv').config();

const { GatewayIntentBits } = require('discord.js');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, AudioPlayerStatus, createAudioResource, entersState } = require('@discordjs/voice');

client.on('ready', () => {
    console.log('ready');
});

client.login(process.env.token);

const resource = createAudioResource('bruh.mp3');
const player = createAudioPlayer();

client.on('voiceStateUpdate', async (oldState, newState) => {
    let oldChannel = oldState.channel;
    let newChannel = newState.channel;

    if (newChannel
        && oldChannel?.id != newChannel?.id
        && newChannel?.name.toLowerCase().includes('bruh')) {
        const connection = joinVoiceChannel({
            channelId: newChannel.id,
            guildId: newChannel.guild.id,
            adapterCreator: newChannel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, () => {
            connection.subscribe(player);
            player.play(resource);
        });

        player.on('error', error => {
            console.error(`Error: ${error.message}`);
        })

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
            if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                connection.destroy();
            }
        })
    }
}); 