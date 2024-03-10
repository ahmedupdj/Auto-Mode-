const { Events,ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setPresence({ activities: [{ name: 'By-SpecialCodes', type: ActivityType.Playing }]});
    }
}
