const { Events, InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',  
    async execute(Interaction, client) {
        if  (Interaction.isChatInputCommand()) {
            const command = Interaction.client.commands.get(Interaction.commandName);
            if(!command) return Interaction.reply({ content: `a7a1 ${Interaction.commandName}`, ephemeral: true })

            try {
                await command.execute(Interaction, client)
            } catch(error) {
                Interaction.reply({ content: `a7a2 ${Interaction.commandName}`, ephemeral: true })
                console.error(error)
            }
        }
    }
}
