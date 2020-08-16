const { calcularIdade, calcularData, searchInstructor } = require('../../lib/logic')
const instructor = require('../models/instructor')

//INDEX 

module.exports = {

    index(req, res) {

        let { filter, page , limit } = req.query

         page = page || 1
         limit = limit || 2

         let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callBack(instructors){

                const pagination =  {
                        total: Math.ceil(instructors[0].total/limit),
                        page,
                }

                return res.render('instructors/index', { instructors, filter, pagination })
            }
        }

         instructor.pagenate(params)

    },

    create(req, res) {

        return res.render('Instructors/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body) // pegando as chaves dos itens
        // E fazendo 1 array com elas 
        // desestruturando o array body

        for (key of keys) {  // validando se todos os campos estão preenchidos

            keyisNull = req.body[key] == ""

            if (keyisNull)
                return res.send('Por favor preencher todos os itens')
        }

        let { avatarUrl, nomeInstructor, dataNascimento, gender, services } = req.body


        const values = [
            nomeInstructor,
            avatarUrl,
            calcularData(dataNascimento).iso,
            gender,
            calcularData(Date.now()).iso,
            services

        ]

        instructor.post(values, (instructor) => {
            return res.redirect(`instructors/${instructor.id}`)
        })

    },
    show(req, res) {

        instructor.find(req.params.id, (instructor) => {

            if (!instructor) return res.send('Instructor not find')

            instructor.age = calcularIdade(instructor.datanascimento)
            instructor.services = instructor.services.split(',')
            instructor.created_at = calcularData(instructor.created_at).br

            return res.render('Instructors/show', { instructor })
        })

    },

    edit(req, res) {
        instructor.find(req.params.id, (instructor) => {

            if (!instructor) return res.send('Instructor not find')

            instructor.datanascimento = calcularData(instructor.datanascimento).iso
            instructor.services = instructor.services.split(',')
            instructor.created_at = calcularData(instructor.created_at).br

            return res.render('Instructors/edit', { instructor })
        })
    },

    put(req, res) {

        const keys = Object.keys(req.body) // pegando as chaves dos itens
        // E fazendo 1 array com elas 
        // desestruturando o array body

        for (key of keys) {  // validando se todos os campos estão preenchidos

            keyisNull = req.body[key] == ""

            if (keyisNull)
                return res.send('Por favor preencher todos os itens')
        }


        instructor.update(req.body, () => {

            return res.redirect(`Instructors/${req.body.id}`)
        })



    },

    delete(req, res) {
        instructor.delete(req.body.id, () => {

            return res.redirect(`/Instructors`)
        })
    }
}
