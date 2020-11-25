module.exports = {
    name: 'setprefix',
    aliases: ['prefix'],
    exec: async function(client, message, args) {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`Você precisa da permissão: \`Gerenciar Servidor\` para executar este comando.`)
        if(!args[0] && args[0].length > 5) return message.channel.send(`Coloque um prefixo novo ou coloque um com menos de 5 caracteres.`)
        require('firebase').default.database().ref(`Guilds/${message.guild.id}`).update({prefix: args[0]})
        message.channel.send(`Prefixo novo: ${args[0]}`)
    }
}