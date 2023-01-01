// const embed = require('../embeds/embeds');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    description: 'Get some command help',
    options: [],

    execute(client, message, args) {
        const prefix = client.config.prefix;
        const commands = client.commands.filter(x => x.showHelp !== false);
        const Embed_help = new Discord.EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle('**List of all my commands**')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
        commands.forEach((cmd) => {
            Embed_help.addFields({name: `**${prefix}${cmd.name}**`, value: `${cmd.description} | Aliases: (${cmd.aliases ? `${cmd.aliases}` : ""})`, inline: true})
        })

        return message.reply({ embeds: [Embed_help], allowedMentions: { repliedUser: false } });
    },

    async slashExecute(client, interaction) {
        const prefix = client.config.prefix;
        const commands = client.commands.filter(x => x.showHelp !== false);
        const Embed_help = new Discord.EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle('**List of all my commands**')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
        commands.forEach((cmd) => {
            Embed_help.addFields({name: `**${prefix}${cmd.name}**`, value: `${cmd.description} | Aliases: (${cmd.aliases ? `${cmd.aliases}` : ""})`, inline: true})
        })

        return interaction.reply({ embeds: [Embed_help], allowedMentions: { repliedUser: false }});
    },
};
