require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('ready');
});

client.login(process.env.token);

client.on('voiceStateUpdate', (oldState, newState) => {
	let oldChannel = oldState.channel;
	let newChannel = newState.channel;

  	if(newChannel 
	   && oldChannel != newChannel 
	   && newChannel.name.toLowerCase().includes('bruh')) {
		newChannel.join().then(connection =>{
			const dispatcher = connection.play(require("path").join(__dirname,'./bruh.mp3'));

			dispatcher.on('finish', () => {
				console.log('end');
				dispatcher.destroy();
				newChannel.leave();
			});
		});
  	} 
});
