const express = require('express')
const routes = express.Router()
const instructors = require('./Post/instructors')
const members = require('./Post/members')

routes.get('/', (req, res) => {
    return res.redirect('/Instructors')
})

routes.get('/Instructors', instructors.index)
routes.get('/Instructors/create', instructors.create)
routes.get('/Instructors/:id', instructors.show)
routes.get('/Instructors/:id/Edit', instructors.edit)
routes.post('/Instructors', instructors.post)
routes.put('/Instructors/', instructors.put)
routes.delete('/Instructors/', instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/Edit', members.edit)
routes.post('/members', members.post)
routes.put('/members/', members.put)
routes.delete('/members/', members.delete)



module.exports = routes