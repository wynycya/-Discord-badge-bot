const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
} = require("discord.js");
const colours = require("../../data/colours.json");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});

            const command = client.commands.get(interaction.commandName);
            if (!command)
                return (
                    interaction.followUp({
                        content: "This command no longer exists",
                    }) && client.commands.delete(interaction.commandName)
                );

            if (command.permission) {
                if (!interaction.guild)
                    return interaction.followUp(
                        "You are not in a server to perform this command."
                    );
                const authorPerms = interaction.channel.permissionsFor(
                    interaction.member
                );
                if (!authorPerms || !authorPerms.has(command.permission)) {
                    const Error1 = new MessageEmbed()
                        .setColor(colours.red)
                        .setDescription(
                            `⛔ You do not have the permission to run this command: ${command.permission}`
                        );
                    return interaction
                        .editReply({ embeds: [Error1] })
                        .then((sent) => {
                            setTimeout(() => {
                                sent.delete();
                            }, 10000)
                        });
                }
            }

            command.execute(interaction, client);
        }
    },
};
