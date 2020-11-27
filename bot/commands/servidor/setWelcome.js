module.exports = {
    name: 'setwelcome',
    aliases: ['setwel'],
    exec: async function(client, message, args) {
        const db = require('firebase').default.database()

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`Você precisa da permissão \`Gerenciar Servidor\` para executar este comando!`)
        if(!message.mentions.channels.first()) {
            return message.channel.send(`Você precisa mencionar um canal!`)
        } else {
            db.ref(`guilds/welcome/${message.guild.id}`).set({
                id: message.mentions.users.first().id
            })

            message.channel.send(`Canal setado com sucesso!\nCanal: ${message.mentions.users.first()}`)
        }
    }
}