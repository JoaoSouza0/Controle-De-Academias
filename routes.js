const express = require('express')
const routes = express.Router()
const instructors = require('./Post/instructors')

routes.get('/', (req, res) => {
    return res.redirect('/Members')
})
routes.get('/Members', (req, res) => {
    return res.render('Members/index')
})
routes.get('/Instructors', (req, res) => {
    return res.render('Instructors/index')
})
routes.get('/Instructors/create', (req, res) => {
    return res.render('Instructors/create')
})

routes.post('/Instructors',instructors)



module.exports = routes