const { Client , Collection , GatewayIntentBits , Discord , Events  , EmbedBuilder , PermissionsBitField } = require("discord.js");
const client = (global.client = new Client({ intents: [98303 , GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages , GatewayIntentBits.GuildPresences , GatewayIntentBits.GuildMessageReactions , GatewayIntentBits.DirectMessages , GatewayIntentBits.MessageContent ]}))
const dotenv = require("dotenv");
dotenv.config();
const { readdir } = require("fs");
require("moment-duration-format");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const Config = require("./Config.json");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    readdir("./src/commands/" + f, (err2, files2) => {
      if (err2) console.log(err2)
      files2.forEach(file => {
        let prop = require(`./src/commands/${f}/` + file);
        console.log(`[FELIXAR-COMMANDS] ${prop.name} is loaded!`);
        commands.set(prop.name, prop);
        prop.aliases.forEach(alias => {
          aliases.set(alias, prop.name);
        });
      });
    });
  });
});

readdir("./src/events", (err, files) => {
  if (err) return console.error(err);
  files.filter((file) => file.endsWith(".js")).forEach((file) => {
    let prop = require(`./src/events/${file}`);
    if (!prop.conf) return;
    client.on(prop.conf.name, prop);
    console.log(`[FELIXAR-EVENTS] ${prop.conf.name} is loaded!`);
  });
});

client.login(Config.Main.botToken).then(() => console.log(`Logged in as ${client.user.username}!`)).catch((err) => console.log(`Error: ${err}`));