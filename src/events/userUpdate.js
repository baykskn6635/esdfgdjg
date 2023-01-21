const Discord = require('discord.js');
const Config = require("../../config.json");
const db = require("quick.db");
const {EmbedBuilder} = require("discord.js");
const client = global.client;

module.exports = async function(oldUser, newUser, message) {


    const guild = client.guilds.cache.get(Config.Guild.guildID);
    const ownerr = client.users.cache.get(Config.Main.botDeveloper);
    const member = guild.members.cache.get(newUser.id)
    var Buton1 = new Discord.ButtonBuilder()
    .setCustomId("buton1")
    .setDisabled(true)
    .setStyle(Discord.ButtonStyle.Success)
    .setLabel("Teşekkürler!")
    .setEmoji("❤️")

    const row = new Discord.ActionRowBuilder()
    .addComponents([Buton1])
    let taglıüye = await guild.members.cache.filter(member => member.user.username.includes(Config.Guild.guildTag)).size
    let etaglıüye = await guild.members.cache.filter(member => member.user.discriminator.includes(Config.Guild.guildDiscrim)).size
    let toplu = taglıüye + etaglıüye
    const embed = new EmbedBuilder().setTimestamp().setFooter({ text: `Sunucuda toplam ${toplu} taglı kullanıcı bulunmakta.`, iconURL: ownerr.avatarURL({ dynamic: true })})
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(Config.Guild.guildTag) && !newUser.username.includes(Config.Guild.guildTag)) {
            member.roles.remove(Config.Roles.roleTeam)
            client.channels.cache.get(Config.Logs.logTag).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı tagımızı çıkartarak ailemizden ayrıldı! (\`${Config.Guild.guildTag}\`)`)]})
        } else if (!oldUser.username.includes(Config.Guild.guildTag) && newUser.username.includes(Config.Guild.guildTag)) {
            member.roles.add(Config.Roles.roleTeam)
            client.channels.cache.get(Config.Channels.Chat).send({ content: `${newUser} kullanıcısı tagımızı alarak ailemize katıldı. (\`#${Config.Guild.guildTag}\`)`, components: [row]}).then((e) => setTimeout(() => { e.delete(); }, 10000));
            client.channels.cache.get(Config.Logs.logTag).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı tagımızı alarak ailemize katıldı! (\`${Config.Guild.guildTag}\`)`)]})
        }
    }
    if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator.includes(Config.Guild.guildDiscrim) && !newUser.discriminator.includes(Config.Guild.guildDiscrim)) {
            member.roles.remove(Config.Roles.roleTeam)
            client.channels.cache.get(Config.Logs.logTag).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı etiket tagımızı çıkartarak ailemizden ayrıldı! (\`${Config.Guild.guildDiscrim}\`)`)]})
        } else if (!oldUser.discriminator.includes(Config.Guild.guildDiscrim) && newUser.discriminator.includes(Config.Guild.guildDiscrim)) {
            member.roles.add(Config.Roles.roleTeam)
            client.channels.cache.get(Config.Channels.Chat).send({ content: `${newUser} kullanıcısı etiket tagımızı alarak ailemize katıldı. (\`#${Config.Guild.guildDiscrim}\`)`, components: [row]}).then((e) => setTimeout(() => { e.delete(); }, 10000));
            client.channels.cache.get(Config.Logs.logTag).send({ embeds: [embed.setDescription(`${newUser} kullanıcısı etiket tagımızı alarak ailemize katıldı! (\`${Config.Guild.guildDiscrim}\`)`)]})
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}