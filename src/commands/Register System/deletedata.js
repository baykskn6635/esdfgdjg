const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const Config = require("../../../config.json")

module.exports = {
    name: "sıfırla",
    aliases: ["teyit-sıfırla", "isimler-sıfırla"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Guild.guildOwners)) return message.reply({ embeds: [embed.setDescription(`${Config.Emojis.Warn} Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    var KayıtVerileri = new ButtonBuilder()
    .setLabel("Yetkili Verileri")
    .setCustomId("kayit_sifirla")
    .setStyle(ButtonStyle.Primary)


    var SunucuVerileri = new ButtonBuilder()
    .setLabel("Kullanıcı Verileri")
    .setCustomId("sunucu_sifirla")
    .setStyle(ButtonStyle.Success)

    var İptal = new ButtonBuilder()
    .setLabel("İptal")
    .setCustomId("iptal")
    .setStyle(ButtonStyle.Danger)

    const row = new ActionRowBuilder()
    .addComponents([KayıtVerileri, SunucuVerileri, İptal])


embed.setDescription(`
${member.toString()} kullanıcısının verilerini sıfırlamak için aşağıdaki butonlarla etkileşime geçin.
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    await message.react(Config.Emojis.Yes)
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "kayit_sifirla") {
        await button.deferUpdate();
        let kayit = db.delete(`yetkilibilgi_${member.id}`) || []
        let erkek = db.delete(`erkek_${uye.id}`) || [];
        let kadın = db.delete(`kadın_${uye.id}`) || [];
        let toplam = db.delete(`toplam_${uye.id}`) || [];
        const isim = new EmbedBuilder()
      .setDescription(`${member.toString()} kullanıcısının **yetkili** verileri ${message.author} tarafından sıfırlandı.`)

msg.edit({
  embeds : [isim],
  components : []
})
      
      }

  if(button.customId === "sunucu_sifirla") {
    await button.deferUpdate();
    let kayit = db.delete(`kullanicibilgi_${member.id}`) || []
    let kljkljk = db.delete(`isimler_${member.id}`) || [];
    const teyit = new EmbedBuilder()
    .setDescription(`${member.toString()} kullanıcısının **genel** verileri ${message.author} tarafından sıfırlandı.`) 

msg.edit({
  embeds: [teyit],
  components : []
})  

    }

 if(button.customId === "iptal") {   
    await button.deferUpdate();
    const iptal = new EmbedBuilder()
    .setDescription(`${member} kullanıcısının verilerini sıfırlama işlemi ${message.author} tarafından iptal edildi.`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};