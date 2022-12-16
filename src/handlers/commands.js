const { readdirSync } = require("fs");

module.exports = (client) => {
    const commandFolders = readdirSync("./commands");
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./commands/${folder}`).filter(
            (files) => files.endsWith(".js")
        );
        const commandsArry = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            commandsArry.push(command);

            client.on("ready", () => {
                client.application.commands.set(commandsArry);
            });
        }
    }
};
