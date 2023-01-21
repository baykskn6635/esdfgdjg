const Discord = require("discord.js");
const db = require("quick.db");
const Config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        const age = args[2]

        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff) && !message.member.roles.cache.has(Config.Guild.guildOwners)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir isim belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!age) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir yaş belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (isNaN(age)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir yaş belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (age < Config.Registration.registerMinAge) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir yaş belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        db.push(`isimler_${member.id}`, ` \`${Config.Registration.registerTagSymbol} ${name} ${Config.Registration.registerSymbol} ${age}\` İsim Değiştirme`);
        await guild.members.cache.get(member.id).setNickname(`${Config.Registration.registerTagSymbol} ${name} ${Config.Registration.registerSymbol} ${age}`);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının ismi ${message.author} tarafından \`${Config.Registration.registerTagSymbol} ${name} ${Config.Registration.registerSymbol} ${age}\` olarak değiştirildi.`)] }).catch((err) => console.log(err), client.ytick(message))
        await message.react(Config.Emojis.Yes)
        client.channels.cache.get(Config.Logs.logName).send({ embeds: [embed.setDescription(`${member} kullanıcısının ismi ${message.author} tarafından \`${Config.Registration.registerTagSymbol} ${name} ${Config.Registration.registerSymbol} ${age}\` olarak değiştirildi.
      
        \`>\` **Kullanıcı**: ${member} - (\`${member.id}\`)
        \`>\` **Yetkili**: ${message.author} - (\`${message.author.id}\`)
        \`>\` **Tarih**: **<t:${Math.floor(message.createdTimestamp/ 1000)}>**`)] });
    }
}