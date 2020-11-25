const { Client, Collection } = require('discord.js')

class client extends Client {
    constructor(options = {}) {
        super(options)

        this.prefix = '!'
        this.commands = new Collection()
        this.aliases = new Collection()
        this.config = require('./config')

        this.on('message', async (message) => {
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

