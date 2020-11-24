const Client = require('./estruturas/client')
const client = new Client({ws: {intents: require('discord.js').Intents.ALL}}) // Ativando o client com todos os intents.

client.init()

// Irei pegar o token e já volto!
/*
Template para bot do discord, utiliado para aprender.
*/

// ligou.
// Agora iremos fazer a handler para o bot utilizar comandos.
