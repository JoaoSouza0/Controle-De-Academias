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

module.exports = routes