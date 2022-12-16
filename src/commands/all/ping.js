const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Say pong",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        interaction.followUp({
            content: "Pong",
        });
    },
};
