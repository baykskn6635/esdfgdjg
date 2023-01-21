const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const Config = require("../../../Config.json")

module.exports = {
    name: "kayıt",
    aliases: ["k"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.has(Config.Registration.registerStaff)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanmak için gerekli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 30000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var name = args[1]
    if (!name) return message.reply({ embeds: [embed.setDescription("Hata! \`.kayıt <@Felixar/ID> <İsim> <Yaş>\`")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 30000));
        if (Config.Registration.registerPurchase) {
            if (!member.username.includes(Config.Guild.guildTag) && !member.roles.cache.has(Config.Roles.roleVip && Config.Roles.roleBooster && Config.Roles.roleMusician && Config.Roles.roleSponsor && Config.Roles.roleTeam)) {
                return message.reply({ embeds: [embed.setDescription(`Hata! Taglı Alım`)] });
            }
        }
    var Erkek = new ButtonBuilder()
    .setLabel("Erkek")
    .setCustomId("erkek")
    .setStyle(ButtonStyle.Success)


    var Kadın = new ButtonBuilder()
    .setLabel("Kadın")
    .setCustomId("kadin")
    .setStyle(ButtonStyle.Success)

    var Bb = new ButtonBuilder()
    .setLabel("İptal")
    .setCustomId("iptal")
    .setStyle(ButtonStyle.Danger)

    var basarili = new ButtonBuilder()
    .setLabel("Kayıt Başarılı!")
    .setCustomId("basarili")
    .setStyle(ButtonStyle.Success)
    .setDisabled(true)
    
    var bilgi = new ButtonBuilder()
    .setLabel("Kullanıcı Bilgileri")
    .setCustomId("bilgiler")
    .setStyle(ButtonStyle.Primary)

    var karsila = new ButtonBuilder()
    .setLabel("Hoşgeldin!")
    .setCustomId("karsila")
    .setEmoji(Config.Emojis.Tadaa)
    .setStyle(ButtonStyle.Success)
    .setDisabled(true)


    const row = new ActionRowBuilder()
    .addComponents([Erkek, Kadın, Bb])

    const row2 = new ActionRowBuilder()
    .addComponents([basarili, bilgi])

    const row3 = new ActionRowBuilder()
    .addComponents([karsila])

embed.setDescription(`
${member.toString()} kullanıcısını butonlarla etkileşime geçerek kayıt edebilirsiniz.

\`\`\`diff
- NOT: LÜTFEN KULLANICIYI TEYİT VERMEDEN KAYIT ETMEYİNİZ!
\`\`\`
`)

    let msg = await message.reply({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "erkek") {
        await button.deferUpdate();
        const guild = message.guild
            await guild.members.cache.get(member.id).setNickname(`${Config.Guild.guildTag} ${name}`);
            db.add(`erkek_${author.id}`, 1)
            db.add(`toplam_${author.id}`, 1)
                  const names = db.get(`isimler_${member.id}`)
                  db.push(`isimler_${member.id}`, ` \`${Config.Guild.guildTag} ${name}\` (<@&${Config.Registration.registerOneMan}>)`);
            db.push(`kullanicibilgi_${member.id}`, `${member} kullanıcısı ${author} tarafından **<t:${Math.floor(message.createdTimestamp/ 1000)}:f>** tarihinde <@&${Config.Registration.registerOneMan}> - \`${name}\` olarak kayıt edildi.`)
            await guild.members.cache.get(member.id).roles.add(Config.Registration.registerMan);
            await guild.members.cache.get(member.id).roles.remove(Config.Registration.registerUnreg)
            const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        const manemb = new EmbedBuilder().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        if (!names) {
            manemb.setDescription(`${member.toString()} kullanıcısı <@&${Config.Registration.registerOneMan}> olarak kayıt edildi ve ismi \`${name}\` olarak değiştirildi.`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        } else {
            manemb.setDescription(`${member.toString()} kullanıcısı <@&${Config.Registration.registerOneMan}> olarak kayıt edildi ve ismi \`${name}\` olarak değiştirildi.`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        }
        client.channels.cache.get(Config.Logs.logRegister).send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından <@&${Config.Registration.registerOneMan}> - \`${name}\` olarak kayıt edildi.
 
        **\`Tarih:\`** **<t:${Math.floor(message.createdTimestamp/ 1000)}:f>**
        **\`Yetkili:\`** ${message.author} - (\`${message.author.id}\`)
        **\`Kullanıcı:\`** ${member} - (\`${member.id}\`)`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})] });
    
    
    
msg.edit({
  embeds : [manemb],
  components : [row2]
})
      
      }

  if(button.customId === "kadin") {
    await button.deferUpdate();
    const guild = message.guild
    
        await guild.members.cache.get(member.id).setNickname(`${Config.Guild.guildTag} ${name}`);
        db.add(`kadın_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
              const names = db.get(`isimler_${member.id}`)
        db.push(`isimler_${member.id}`, ` \`${Config.Guild.guildTag} ${name}\` (<@&${Config.Registration.registerOneWoman}>)`);
        db.push(`kullanicibilgi_${member.id}`, `${member} kullanıcısı ${author} tarafından **<t:${Math.floor(message.createdTimestamp/ 1000)}:f>** tarihinde <@&${Config.Registration.registerOneWoman}> - \`${name}\` olarak kayıt edildi.`)
        await guild.members.cache.get(member.id).roles.add(Config.Registration.registerWoman);
        await guild.members.cache.get(member.id).roles.remove(Config.Registration.registerUnreg)
        const Felixar = client.users.cache.get(Config.Main.botDeveloper);
    const womanemb = new EmbedBuilder().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
    if (!names) {
        womanemb.setDescription(`${member.toString()} kullanıcısı <@&${Config.Registration.registerOneWoman}> olarak kayıt edildi ve ismi \`${name}\` olarak değiştirildi.`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
    } else {
        womanemb.setDescription(`${member.toString()} kullanıcısı <@&${Config.Registration.registerOneWoman}> olarak kayıt edildi ve ismi \`${name}\` olarak değiştirildi.`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`)} | Kadın kayıt: ${db.get(`kadın_${author.id}`)} | Toplam kayıt: ${db.get(`toplam_${author.id}`)}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
    }
    client.channels.cache.get(Config.Logs.logRegister).send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından <@&${Config.Registration.registerOneWoman} - \`${name}\` olarak kayıt edildi.
 
    **\`Tarih:\`** **<t:${Math.floor(message.createdTimestamp/ 1000)}:f>**
    **\`Yetkili:\`** ${message.author} - (\`${message.author.id}\`)
    **\`Kullanıcı:\`** ${member} - (\`${member.id}\`)`).setFooter({ text: `Erkek kayıt: ${db.get(`erkek_${author.id}`) || 0} | Kadın kayıt: ${db.get(`kadın_${author.id}`) || 0} | Toplam kayıt: ${db.get(`toplam_${author.id}`) || 0}`, iconURL: Felixar.displayAvatarURL({dynamic: true})})] });



msg.edit({
  embeds: [womanemb],
  components : [row2]
})  

    }

    if(button.customId === "bilgiler") {   
        await button.deferUpdate();
        const guild = message.guild
        const Felixar = client.users.cache.get(Config.Main.botDeveloper);
        const bilgilerrr = db.get(`kullanicibilgi_${member.id}`)
        const EmbedAmk = new EmbedBuilder().setColor(message.member.displayHexColor).setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `Developed by Felixar`, iconURL: Felixar.displayAvatarURL({dynamic: true})})
        if (!bilgilerrr) return message.reply({ embeds: [EmbedAmk.setDescription(`${member} kullanıcıya ait veri bulunamadı.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 30000));
        EmbedAmk.setTitle("Kullanıcıya ait veriler:").setDescription(bilgilerrr.map((data, n) => `**${n + 1}.** ${data}`).join("\n\n"))
        
    msg.edit({
      embeds: [EmbedAmk],
      components : []
    })  
        }
                  

 if(button.customId === "iptal") {   
    await button.deferUpdate();
    const iptal = new EmbedBuilder()
    .setDescription(`${member} kullanıcısının kayıt işlemi ${message.author} tarafından iptal edildi.`)

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};