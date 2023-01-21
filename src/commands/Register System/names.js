const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const Config = require("../../../config.json");

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
  
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        if (!member) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let names = db.get(`isimler_${member.id}`)
        if (!names) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına ait isim verisi bulunamadı.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ embeds: [embed.setTitle("Kullanıcıya ait isim verileri:").setThumbnail(message.guild.iconURL()).setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n"))] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        await message.react(Config.Emojis.Yes)
    }
}