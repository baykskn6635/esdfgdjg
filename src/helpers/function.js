const { TextChannel, EmbedBuilder } = require("discord.js");
const Config = require("../../Config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = async client => {
    client.fetchUser = async (userID) => {
        try {
            return await client.users.fetch({ message: userID});
        } catch (err) {
            return undefined;
        }
    };

    TextChannel.prototype.error = async function (message, text) {
        const author = message.author
        const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        const embed = new EmbedBuilder()
        .setColor(message.member.displayHexColor)
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
        .setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        this.send({ embeds: [embed.setDescription(text)] }).then(x => { if (x.deletable) setTimeout(() => { x.delete(); }, 10000) });
    };

    client.tick = async function (message) {
        if (Config.Emojis.Yes) {
            message.react(Config.Emojis.No);
        }
    };

    client.ytick = async function (message) {
        if (Config.Emojis.No) {
            message.react(Config.Emojis.Yes);
        }
    };
}