const Center = require('center-align')
const MTASAClient = require('mtasa').Client;

const { Client, Intents } = require('discord.js')
const { Logger } = require('./libs')
const { Bot, Server } = require('./config')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
if (!client && Logger)
    Logger.error('Discord.js not found. Please use npm install again!')

const mta = new MTASAClient(Server.ip, Server.port, Server.username, Server.password)
if (!mta)
    Logger.error('Server not found. Please check server config again!')

client.once('ready', async () => {
    console.log(Center('TTG Bot başlatıldı', process.stdout.columns))
})

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild)
        return false;

    if (!(message.guildId === Bot.guild.id))
        return false;

    if (!(message.channelId === Bot.guild.channel.default))
        return false;

    await mta.call('ttg-webhooks', 'outputDiscordChat', `(Discord) ${message.author.username}: #ffffff${message.content}`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    switch (interaction.commandName) {
        case 'ip': {
            await interaction.reply(`mtasa://${Server.ip}:${Server.port} adresinden sunucumuza giriş yapabilirisiniz`)
            break;
        }
    }
})

client.login(Bot.token).then(async () => {
    if (!(client.user.setActivity(Bot.guild.activity.name, { type: Bot.guild.activity.type })))
        return Logger.error(`Aktivite ${Bot.guild.activity.name} olarak ayarlanamadı. Lütfen geliştirici ile iletişime geçin!`)

    await client.guilds.cache.get(Bot.guild.id).commands.create({
        name: 'ip',
        description: 'TTG Sunucu ip adresini gösterir'
    })
})

process.on('exit', () => {
    client.destroy()
})