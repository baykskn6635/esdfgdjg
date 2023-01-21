const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const Config = require("../../../config.json")


String.prototype.replaceA = function (find, replace) {
    return this.replace(new RegExp(find, 'g'), replace);
  }
  const emoji = function(sayı) {
    let emojiler = sayı.toString().replace('0', '0a')
      .replaceA('1', '1a')
      .replaceA('2', '2a')
      .replaceA('3', '3a')
      .replaceA('4', '4a')
      .replaceA('5', '5a')
      .replaceA('6', '6a')
      .replaceA('7', '7a')
      .replaceA('8', '8a')
      .replaceA('9', '9a')
    
    emojiler = emojiler
      .replaceA("0a", Config.Emojis.Numbers.numberZero)
      .replaceA("1a", Config.Emojis.Numbers.numberOne)
      .replaceA("2a", Config.Emojis.Numbers.numberTwo)
      .replaceA("3a", Config.Emojis.Numbers.numberThree)
      .replaceA("4a", Config.Emojis.Numbers.numberFour)
      .replaceA("5a", Config.Emojis.Numbers.numberFive)
      .replaceA("6a", Config.Emojis.Numbers.numberSix)
      .replaceA("7a", Config.Emojis.Numbers.numberSeven)
      .replaceA("8a", Config.Emojis.Numbers.numberEight)
      .replaceA("9a", Config.Emojis.Numbers.numberNine)
    
    return emojiler
  }

module.exports = {
    name: "yetkili-bilgi",
    aliases: ["yb", "me", "teyitlerim", "kayitlarim"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var guild = message.guild;
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]) || message.member;
    if (!member) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Lütfen geçerli bir kullanıcı belirtin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));


    var YetkiliBilgileri = new ButtonBuilder()
    .setLabel("Yetkili Bilgileri")
    .setCustomId("yetkili")
    .setStyle(ButtonStyle.Primary)

    const row = new ActionRowBuilder()
    .addComponents([ YetkiliBilgileri])

    let erkek = db.get(`erkek_${author.id}`) || 0;
    let kadın = db.get(`kadın_${author.id}`) || 0;
    let toplam = db.get(`toplam_${author.id}`) || 0;

embed.setDescription(`${member} yetkilisine ait ${emoji(toplam)} kayıt verisi bulunmakta.`)
embed.addField(`Erkek kayıt verileri:`, `\`>\` ${emoji(erkek)} Erkek kayıt`)
embed.addField(`Kadın kayıt verileri:`, `\`>\` ${emoji(kadın)} Kadın kayıt`)
.setThumbnail(message.guild.iconURL())

    let msg = await message.reply({ embeds: [embed], components: [row] })
    await message.react(Config.Emojis.Yes)
    await message.react(Config.Emojis.Yes)
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

  if(button.customId === "yetkili") {
    await button.deferUpdate();
    const guild = message.guild
    const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        const bilgilerrr = db.get(`yetkilibilgi_${author.id}`)
        const EmbedAmk = new EmbedBuilder().setColor("BLURPLE").setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})}).setThumbnail(message.guild.iconURL())
        if (!bilgilerrr) return msg.edit({ embeds: [EmbedAmk.setDescription(`Veri tabanında veri bulunamadı.`)] })
        EmbedAmk.setTitle("Yetkiliye ait veriler:").setDescription(bilgilerrr.map((data, n) => `**${n + 1}.** ${data}`).join("\n\n"))


msg.edit({
  embeds: [EmbedAmk],
  components : []
})  

    }



  })
  }
};


