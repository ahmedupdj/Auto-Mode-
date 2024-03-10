const Discord = require('discord.js');
const { token } = require("./config.json")
const client = new Discord.Client({
    intents: [
        Object.keys(Discord.GatewayIntentBits)
    ],
});
const express = require('express');
const app = express();

app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
const fs = require('fs');

client.SlashCommands = new Discord.Collection();
fs.readdirSync("./handlers").forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
module.exports.Client = client;




client.login(token);




//Eroros
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});