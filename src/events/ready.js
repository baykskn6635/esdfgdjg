const Config = require("../../config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const db = require("quick.db")
const {Discord, ActivityType} = require("discord.js")
const client = global.client;

module.exports = () => {
    setInterval(() => {
        const oynuyor = Config.Others.botStatus;
        const index = Math.floor(Math.random() * (oynuyor.length));
  
        client.user.setPresence({
              activities: [
                  {
                      name: `${oynuyor[index]}`,
                      type: ActivityType.Streaming,
                      url: `https://twitch.tv/FelixarJS`
                       }
              ],
          });
      }, 3000);
    const VoiceChannel = client.channels.cache.get(Config.Others.botVoice);
	joinVoiceChannel({
		channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true,
        selfMute: true
	});
    const tag = db.get(`bannedtag_${Config.Guild.guildTag}`)
    if (tag) {
        setInterval(async () => {
            client.guilds.cache.get(Config.Guild.guildTag).members.cache.filter(uye => uye.user.username.includes(tag)).map(async (uye2) => {
                if (uye2.roles.cache.get(Config.Registration.registerSuspecios)) return
                await uye2.setNickname((uye2.displayName).replace(tag)).catch(() => { });
                await uye2.roles.add(Config.Registration.registerSuspecios).catch(() => { })
            });
        }, 5000)
    }

    setInterval(function () {
        db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
            db.delete(data.ID)
        })
    }, 1000 * 60 * 60 * 5)
    
}

module.exports.conf = {
    name: "ready"
}
