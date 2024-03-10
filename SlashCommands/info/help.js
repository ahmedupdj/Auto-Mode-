const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bot Commands')
            .setDescription(`
            **${interaction.guild.name} My prefix /**


            /automod flagged-wards

            /automod keywords

            /automod mention-spam

            /automod spam-msg
            `)
            .setThumbnail('https://cdn.discordapp.com/avatars/947952564803096676/0e4f85444411307d991b3890b20ec292.webp?size=4096')
            .setTimestamp();

        const messageSent = await interaction.user.send({ embeds: [embed] });

        if (messageSent) {
            await interaction.reply({ content: 'The message has been sent in private.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'The message was not sent, please open your private message.', ephemeral: true });
        }
    },
};
