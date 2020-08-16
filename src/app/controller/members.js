const { calcularIdade, calcularData, searchmember } = require('../../lib/logic')
const Member = require('../models/members')

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
           callBack(members){

               const pagination =  {
                       total: Math.ceil(members[0].total/limit),
                       page,
               }

               return res.render('Members/index', { members, filter, pagination })
           }
       }

        Member.pagenate(params)
    },

    create(req, res) {

        Member.instructorsSelectOptions((options) => {

            return res.render('Members/create', { instructorOptions: options }) // rederizando pagina de criação de clientes
        })
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

        let { avatarurl, nome, email, datanascimento, gender, blood, weight, height, instructors } = req.body


        const values = [
            avatarurl,
            nome,
            email,
            calcularData(datanascimento).iso,
            gender,
            blood,
            weight,
            height,
            calcularData(Date.now()).iso,
            instructors
        ]

        Member.post(values, (member) => {
            return res.redirect(`Members/${member.id}`)
        })

    },
    show(req, res) {

        Member.find(req.params.id, (member) => {

            if (!member) return res.send('member not find')

            member.age = calcularIdade(member.datanascimento)
            member.created_at = calcularData(member.created_at).br

            return res.render('Members/show', { member })
        })

    },

    edit(req, res) {
        Member.find(req.params.id, (member) => {

            if (!member) return res.send('member not find')

            member.datanascimento = calcularData(member.datanascimento).iso
            member.created_at = calcularData(member.created_at).br
            
            Member.instructorsSelectOptions((options) => {

                return res.render('Members/edit', { member, instructorOptions: options }) // rederizando pagina de criação de clientes
            })

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

        let { avatarurl, nome, email, datanascimento, gender, blood, weight, height, id, instructors } = req.body


        const values = [
            avatarurl,
            nome,
            email,
            calcularData(datanascimento).iso,
            gender,
            blood,
            weight,
            height,
            instructors,
            id
        ]

        Member.update(values, () => {

            return res.redirect(`Members/${req.body.id}`)
        })



    },

    delete(req, res) {
        Member.delete(req.body.id, () => {

            return res.redirect(`/Members`)
        })
    }
}
