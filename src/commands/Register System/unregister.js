const { EmbedBuilder } = require('discord.js')
const db = require("quick.db");
const Config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "kayıtsız",
    aliases: ["unreg", "unregister", "unregistered"],
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.guild.members.cache.get(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff) && !message.member.roles.cache.has(Config.Guild.guildOwners)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.roles.cache.has(Config.Registration.registerUnreg)) return message.reply(`${Config.Emojis.Warn} Bu kullanıcı zaten kayıtsız olarak bulunmakta!`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.id == message.member.id) return message.reply(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.bot) return message.reply(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        await member.roles.set([Config.Registration.registerUnreg]).catch()
        await member.setNickname(Config.Registration.registerNick);
        message.reply({ content: `${member} kullanıcısı ${message.author} tarafından **kayıtsız**a atıldı.` });
        await message.react(Config.Emojis.Yes)
    }
}