const { MessageEmbed } = require("discord.js")
const { utc } = require("moment")

module.exports = {
    name: 'emojiinfo',
    aliases: ['einfo', 'ei', 'emoji'],
    exec: async function(client, message, args) {
        const EMOJI_REGEX = /:[^:\s]*(?:::[^:\s]*)*:/ // está no roteiro, vou digitar isso não.

        if(!EMOJI_REGEX.test(args[0])) {
            return message.channel.send(`Isso não é um emoji!`)
        } else {
            const emoji = args[0].trim().split(':')[2].slice(0, 18)

            const emojis = client.emojis.cache.find(emoje => emoje.id == emoji)|| client.emojis.cache.get(args[0])

            const embed = new MessageEmbed()
            .setTitle(`Informações do emoji: ${emojis.name}`)
            .setThumbnail(emojis.url)
            .addField(`É animado ?`, emojis.animated ? 'Sim' : 'Não')
            .addField(`Link: `, `[Clique aqui](${emojis.url})`) // No vídeo #5 errei como faz, quem quiser ver agora.
            .addField(`Criado dia: `, utc(emojis.createdAt).format('LL'))
            .addField(`ID do emoji: `, `\`${emojis.id}\``)
            .addField(`Servidor que o emoji se encontra: `, emojis.guild.name)
            message.channel.send(embed)
        } 
    }
}       