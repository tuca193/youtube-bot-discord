const fs = require('fs')

module.exports = (client) => {
    fs.readdirSync('./bot/commands').forEach(category => {
        const command = fs.readdirSync(`./bot/commands/${category}`).filter(file => file.endsWith('.js'))
// desculpa, é erro pra lá e pra cá. kkkk
        for(let files of command) {
            const cmd = require(`../commands/${category}/${files}`)

            if(cmd.name) {
                client.commands.set(cmd.name, cmd)
            } else {
                continue;
            }

            if(cmd.aliases) {
                cmd.aliases.forEach(alias => {
                    client.aliases.set(alias, cmd.name)
                })
            }
        }
    })
}