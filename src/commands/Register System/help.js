
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const Config = require("../../../config.json")

module.exports = {
    name: "yardım",
    aliases: ["yardim", "help"],
    execute: async (client, message, args, embed, author, channel) => {

    var KayitCommands = new ButtonBuilder()
    .setLabel("Kayıt Komutları")
    .setCustomId("kayitkomutlari")
    .setStyle(ButtonStyle.Primary)

    const row = new ActionRowBuilder()
    .addComponents([KayitCommands])



    const GenelEmbed = new EmbedBuilder()
    const Felixar = client.users.cache.get(Config.Main.botDeveloper);
    GenelEmbed.setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})}).setThumbnail(message.guild.iconURL()).setDescription(`Butonlarla etkileşime geçerek **komutlar** hakkında yardım alabilirsiniz.
`)

    let msg = await message.reply({ embeds: [GenelEmbed], components: [row] });
    await message.react(Config.Emojis.Yes)
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "kayitkomutlari") {
        await button.deferUpdate();

        const KayitKomutlariEmbed = new EmbedBuilder()
        const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        KayitKomutlariEmbed.setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})}).setThumbnail(message.guild.iconURL()).setDescription(`
        \`>\` .top
        \`>\` .teyitlerim
        \`>\` .bilgi <@Felixar/ID>
        \`>\` .kayıt <@Felixar/ID>
        \`>\` .isimler <@Felixar/ID>
        \`>\` .sıfırla <@Felixar/ID>
        \`>\` .kayıtsız <@Felixar/ID>
        \`>\` .isim <@Felixar/ID> İsim Yaş`)
        msg.edit({
          embeds: [KayitKomutlariEmbed],
          components : []
        }) 
          }
  })
  }
};