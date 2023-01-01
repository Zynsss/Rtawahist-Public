const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embed = require('../embeds/embeds');


module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Show now playing song',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return message.reply({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });

        const track = queue.current;

        const timestamp = queue.getPlayerTimestamp();

        const progress = queue.createProgressBar();
        if (timestamp.progress == 'Infinity')
            return message.reply({ content: `❌ | This song is live streaming, no duration data to display.`, allowedMentions: { repliedUser: false } });
        let description = `Author : **${track.author}**\n${progress} (**${timestamp.progress}**%)`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';

        let saveButton = new ButtonBuilder();
        saveButton.setCustomId('Save Song');
        saveButton.setLabel('Save Song');
        saveButton.setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(saveButton);

        return message.channel.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description, loopStatus)], components: [row] });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
            return await interaction.reply({ content: `❌ | There is no music currently playing.`, allowedMentions: { repliedUser: false } });

        const track = queue.current;

        const timestamp = queue.getPlayerTimestamp();

        const progress = queue.createProgressBar();
        if (timestamp.progress == 'Infinity')
            return message.reply({ content: `❌ | This song is live streaming, no duration data to display.`, allowedMentions: { repliedUser: false } });
        let description = `Author : **${track.author}**\n${progress} (**${timestamp.progress}**%)`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';

        let saveButton = new ButtonBuilder();
        saveButton.setCustomId('Save Song');
        saveButton.setLabel('Save Song');
        saveButton.setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(saveButton);
        return await interaction.reply({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description, loopStatus)], components: [row]});
    },
};