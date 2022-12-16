const secret = require("./secret.json");
const colours = require("./data/colours.json");
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const intents = new Intents(32767);
const client = new Client({ intents });
client.setMaxListeners(0);
module.exports = client;

client.commands = new Collection();

["events", "commands"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

//client.on('debug', e => console.log(e))

client.on("ready", () => {
    console.log(`${client.user.username} est en ligne`);
    function randomStatus() {
        client.user.setActivity(
            `, looking ${client.guilds.cache.size} servers!`,
            {
                type: "STREAMING",
                url: "https://www.twitch.tv/monstercat",
            }
        )
    }
    setInterval(randomStatus, 300000)
});
client.login(secret.token);
