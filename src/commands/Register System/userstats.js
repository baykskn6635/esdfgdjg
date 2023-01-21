const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const Config = require("../../../config.json")

module.exports = {
    name: "bilgi",
    aliases: ["kb"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var guild = message.guild;
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    if (!member) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));



    var KayıtBilgileri = new ButtonBuilder()
    .setLabel("Kayıt Bilgileri")
    .setCustomId("kayit")
    .setStyle(ButtonStyle.Primary)


    const row = new ActionRowBuilder()
    .addComponents([KayıtBilgileri])

embed.setDescription(`Butonlarla etkileşime geçerek detaylı bilgilere ulaşabilirsiniz.`)

    let msg = await message.reply({ embeds: [embed], components: [row] });
    await message.react(Config.Emojis.Yes);
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

  if(button.customId === "kayit") {
    await button.deferUpdate();
    const guild = message.guild
    const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        const bilgilerrr = db.get(`kullanicibilgi_${member.id}`)
        const EmbedAmk = new EmbedBuilder().setColor(message.member.displayHexColor).setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        if (!bilgilerrr) return msg.edit({ embeds: [EmbedAmk.setDescription(`Veri tabanında veri bulunamadı.`)] })
        EmbedAmk.setTitle("Kullanıcıya ait veriler:").setDescription(bilgilerrr.map((data, n) => `**${n + 1}.** ${data}`).join("\n\n"))


msg.edit({
  embeds: [EmbedAmk],
  components : []
})  

    }


  })
  }
};


