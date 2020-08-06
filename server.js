const express = require('express')     //Criando o servidor 
const nunjucks = require('nunjucks')        
const routes  = require('./routes')

const server = express()

server.use(express.static('public')) //arrumando a pasta public
server.use(routes) // Criando rotas
server.set('view engine', 'njk') //Configurando a view engine

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, () => { //Colocando serve online
    console.log('Voce pode ir até: http://localhost:5000')
})