const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('/Members')
})
routes.get('/Members', (req, res) => {
    return res.render('Members/index')
})
routes.get('/Instructors', (req, res) => {
    return res.render('Instructors/index')
})

routes.post('/Instructors',(req,res)=>{

    return res.send('recebido')
})

routes.get('/Instructors/create', (req, res) => {
    return res.render('Instructors/create')
})

module.exports = routes