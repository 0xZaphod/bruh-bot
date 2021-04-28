require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('ready');
});

client.login(process.env.token);

client.on('voiceStateUpdate', (oldState, newState) => {
	let channel = newState.channel;

  	if(channel && channel.name.toLowerCase().includes('bruh')) {
		channel.join().then(connection =>{
			const dispatcher = connection.play(require("path").join(__dirname,'./bruh.mp3'));
			console.log(dispatcher);

			dispatcher.on('finish', () => {
				console.log('end');
				dispatcher.destroy();
				channel.leave();
			});
		});
  	} 
});