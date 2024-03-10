const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { clientId } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('autoMod the server')
        .addSubcommand(command => command.setName('flagged-wards').setDescription('flagged-wards'))
        .addSubcommand(command => command.setName('spam-msg').setDescription('block-spam'))
        .addSubcommand(command => command.setName('mention-spam').setDescription('mention-spam').addIntegerOption(option => option.setName('number').setDescription('number').setRequired(true)))
        .addSubcommand(command => command.setName('keywords').setDescription('keywords').addStringOption(option => option.setName('word').setDescription('word').setRequired(true))),

    async execute(interaction) {
        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'you do not have permissions' });

        switch (sub) {
            case 'flagged-wards':
                await interaction.reply({ content: 'Loading' });
                const rule = await guild.autoModerationRules.create({
                    name: 'Block flagged-wards',
                    creatorId: clientId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 4,
                    triggerMetadata: {
                        presets: [1, 2, 3]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: 'this msg send by Special codes autoMod'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}` });
                    }, 2000);
                });
                setTimeout(async () => {
                    if (!rule) return;

                    const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription('Done  Enable  flagged-wards in server');

                    await interaction.editReply({ content: ``, embeds: [embed] });

                }, 3000);
                break;

            case 'keywords':
                await interaction.reply({ content: 'Loading' });
                const word = options.getString('word');
                const rule2 = await guild.autoModerationRules.create({
                    name: `prevent ${word} wards  Special codes`,
                    creatorId: clientId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetadata: {
                        keywordFilter: [`${word}`]
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: 'this msg send by Special codes autoMod'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}` });
                    }, 2000);
                });
                setTimeout(async () => {
                    if (!rule2) return;

                    const embed2 = new EmbedBuilder()
                        .setColor('Blue')
                        .setDescription(`This word has been blocked from being sent on the server  ${word}`);

                    await interaction.editReply({ content: ``, embeds: [embed2] });

                }, 3000);
                break;

            case 'spam-msg':
                await interaction.reply({ content: 'Loading' });
                const rule3 = await guild.autoModerationRules.create({
                    name: 'Prevent spam Msg by Special codes',
                    creatorId: clientId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 3,
                    triggerMetadata: {
                        //mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: 'this msg send by Special codes autoMod'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}` });
                    }, 2000);
                });
                setTimeout(async () => {
                    if (!rule3) return;

                    const embed3 = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription('Done  Enable  spam-msg in server');

                    await interaction.editReply({ content: ``, embeds: [embed3] });

                }, 3000);
                break;

            case 'mention-spam':
                await interaction.reply({ content: 'Loading' });
                const number = options.getInteger('number');
                const rule4 = await guild.autoModerationRules.create({
                    name: 'Prevent spam Msg by Special codes',
                    creatorId: clientId,
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetadata: {
                        mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: 'this msg send by Special codes autoMod'
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({ content: `${err}` });
                    }, 2000);
                });
                setTimeout(async () => {
                    if (!rule4) return;

                    const embed4 = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription(`Done  Enable  mention-spam in server  And the number is **${number}**`);

                    await interaction.editReply({ content: ``, embeds: [embed4] });

                }, 3000);
                break;
        }
    }
};
