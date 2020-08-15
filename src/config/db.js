const {Pool} = require('pg') // Importando classe que irá guarar o acesso ao banco

module.exports = new Pool({
    user:'postgres',
    password:'20103101',
    host:'localhost',
    port: '5432',
    database:'gymmanager'

})
