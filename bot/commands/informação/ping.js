module.exports = {
    name: 'ping',
    aliases: ['p'],
    exec: async function(client, message, args) {
        const ping = client.ws.ping // ping do bot.

        message.channel.send(`Meu ping é: ${ping}`)
    }
}