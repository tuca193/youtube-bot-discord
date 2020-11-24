const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    exec: async function(client, message, args) {
        const user = message.mentions.users.first() || client.users.cache.find(user => user.username == args[0]) || client.users.cache.get(args[0]) || message.author

        const embed = new MessageEmbed()
        .setTitle(`Avatar do usuário: ${user.username}`)
        .setImage(user.avatarURL({dynamic: true, size: 2048}))

        message.channel.send(embed)
    }
} 