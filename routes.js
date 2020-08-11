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

routes.get('/Instructors/:id', instructors.show)

routes.get('/Instructors/:id/Edit',instructors.edit)

routes.post('/Instructors',instructors.post)

routes.put('/Instructors/', instructors.put)

routes.delete('/Instructors/', instructors.delete)



module.exports = routes