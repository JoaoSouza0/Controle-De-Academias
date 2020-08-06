const express = require('express')
const routes = express.Router()

routes.get('/', (req,res)=>{

    return res.send('Olá pessoal estou funcionando')

})

module.exports = routes