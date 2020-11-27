const { Client, Collection, MessageEmbed } = require('discord.js')
const firebase = require('firebase')

class client extends Client {
    constructor(options = {}) {
        super(options)

        this.prefix = '!'
        this.commands = new Collection()
        this.aliases = new Collection()
        this.config = require('./config')

        this.on('guildMemberAdd', async (member) => {
            const db = require('firebase').default.database()
            
            const channel = await db.ref(`guilds/welcome/${member.guild.id}`).once('value')

            if(!channel.val().id) {
                return;
            } else {
                const embed = new MessageEmbed()
                .setTitle(`Bem vindo ${member.user.username}! `)
                .setDescription(`Espero que divirta-se no servidor!`)
                .setFooter(`Evento GuildMemberAdd`, this.user.avatarURL())
                this.channels.cache.get(channel.val().id).send(embed) 
            }
        })

        this.on('message', async (message) => {
            const prefix = await firebase.default.database().ref(`Guilds/${message.guild.id}`).once('value')
            if(prefix.val().prefix != null) {
                this.prefix = prefix.val().prefix
            } else {
                this.prefix = '!'
            }
            const args = message.content.trim().slice(this.prefix.length).split(/ +/g)
            const cmd = args.shift().toLowerCase()
            const command = this.commands.get(cmd) || this.commands.get(this.aliases.get(cmd))
            if(message.author.bot) return;
            if(message.channel.type == 'DM') return;
            const mentions = [`<@${this.user.id}>`, `<@!${this.user.id}>`]
            mentions.forEach(mention => {
                if(message.content == mention) {
                    message.channel.send(`Meu prefixo é: ${this.prefix}`)
                }
            })
            if(!message.content.startsWith(this.prefix)) return;

            if(command) {
                command.exec(this, message, args)
            }

        })
        
        this.init = async function init() {
            ['command'].forEach(event => require(`../bot/handlers/${event}`)(this))
            this.login(this.config.token)
            console.log(`Bot online.`)
        }
    }
}

module.exports = client

