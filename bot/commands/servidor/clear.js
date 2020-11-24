const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'clear',
    aliases: ['clean'],
    exec: async function(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Você não tem a permissão  \`Gerenciar Mensagens\` para executar este comando.`)
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Eu não tenho a permissão \`Gerenciar Mensagens\` para executar este comando.`)
        if(!args[0]) return message.channel.send(`Coloque um número.`)
        if(isNaN(args[0])) return message.channel.send(`Coloque um número válido.`)
        message.channel.bulkDelete(Number(args[0]))
        message.channel.send(`Apaguei ${args[0]} mensagens!`)
    }
}