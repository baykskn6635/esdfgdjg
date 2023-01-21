const db = require("quick.db");
const Config = require("../../config.json");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
require("moment-duration-format");
const {Discord , ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');


module.exports = async (member, client) => {

    var buton = new ButtonBuilder()
.setLabel("Kayıt için tıkla!")
.setStyle(ButtonStyle.Link)
.setURL(Config.Channels.RegisterVoiceChannel)

var buton2 = new ButtonBuilder()
.setLabel("Güvenli Kullanıcı")
.setCustomId("buton2")
.setStyle(ButtonStyle.Success)
.setDisabled(true)

var buton3 = new ButtonBuilder()
.setLabel("Şüpheli Kullanıcı")
.setCustomId("buton3")
.setStyle(ButtonStyle.Danger)
.setDisabled(true)


const row = new ActionRowBuilder()
.addComponents([buton, buton2])

const row2 = new ActionRowBuilder()
.addComponents([buton, buton3])

var MemberCount = member.guild.memberCount.toString().replace(/ /g, "    ")
var mc = MemberCount.match(/([0-9])/g)
MemberCount = MemberCount.replace(/([a-zA-Z])/g, "0").toLowerCase()
if(mc) {
  MemberCount = MemberCount.replace(/([0-9])/g, d => {
    return {
      '0': `${Config.Emojis.Numbers.numberZero}`,
      '1': `${Config.Emojis.Numbers.numberOne}`,
      '2': `${Config.Emojis.Numbers.numberTwo}`,
      '3': `${Config.Emojis.Numbers.numberThree}`,
      '4': `${Config.Emojis.Numbers.numberFour}`,
      '5': `${Config.Emojis.Numbers.numberFive}`,
      '6': `${Config.Emojis.Numbers.numberSix}`,
      '7': `${Config.Emojis.Numbers.numberSeven}`,
      '8': `${Config.Emojis.Numbers.numberEight}`,
      '9': `${Config.Emojis.Numbers.numberNine}`}[d];
    })
  } 
  
    var kurulus = (Date.now() - member.user.createdTimestamp);
    if (kurulus > 604800000) {
        member.roles.add(Config.Registration.registerUnreg);
        member.roles.add(Config.Registration.registerUnreg);
        member.setNickname(Config.Registration.registerNick);
        member.guild.channels.cache.get(Config.Channels.Welcome).send({ content: `Sunucumuza hoş geldin ${member}!
                      
Hesabın **<t:${Math.floor(member.user.createdTimestamp/ 1000)}:f>** tarihinde (**<t:${Math.floor(member.user.createdTimestamp/ 1000)}:R>**) oluşturulmuş.
      
Seninle birlikte **${MemberCount}** kullanıcıya ulaştık!
      
\`\`\`diff
- NOT: Lütfen kuralları okumayı ihlal etmeyiniz, aksi takdirde ceza-i işlem uygulanıcaktır!
\`\`\``, components: [row]})
    } else {
        member.roles.add(Config.Registration.registerSuspecios).send()
        member.setNickname(Config.Registration.registerSuspeciosNick);
        member.guild.channels.cache.get(Config.Channels.Welcome).send({ embeds: [embed.setDescription({ content: `Sunucumuza hoş geldin ${member}!
                      
Hesabın **<t:${Math.floor(member.user.createdTimestamp/ 1000)}:f>** tarihinde (**<t:${Math.floor(member.user.createdTimestamp/ 1000)}:R>**) oluşturulmuş.
      
Seninle birlikte **${MemberCount}** kullanıcıya ulaştık!
      
\`\`\`diff
- NOT: Lütfen kuralları okumayı ihlal etmeyiniz, aksi takdirde ceza-i işlem uygulanıcaktır!
\`\`\``, components: [row2]})]})
    }

    //////////////



}

module.exports.conf = {
    name: "guildMemberAdd"
}