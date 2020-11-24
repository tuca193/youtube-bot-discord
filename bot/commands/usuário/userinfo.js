const { MessageEmbed } = require("discord.js")
const moment = require('moment')
moment.locale('pt-br')

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'useri'],
    exec: async function(client, message, args) {
        const user = message.mentions.users.first() || client.users.cache.find(user => user.username == args[0]) || client.users.cache.get(args[0]) || message.member.user
        const { joinedAt, createdAt } = message.mentions.users.first() || client.users.cache.find(user => user.username == args[0]) || client.users.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
        .setTitle(`Informações do usuário: ${user.username}`) // lembrando que se colocar só {user} vai mostrar o id.
        .setDescription(`Tag: ${user.tag}\n\nID: ${user.id}\n\nConta criada dia: ${moment.utc(user.createdAt).format('LL')}\n\n`) // \n é uma quebra de linha.

        if(joinedAt) {
            embed.addField(`Entrou no servidor dia:`, moment.utc(createdAt).format('LL'))
        }
        message.channel.send(embed)
    }
} // recolocando o token.