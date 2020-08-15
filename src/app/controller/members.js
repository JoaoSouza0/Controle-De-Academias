const { calcularIdade, calcularData, searchmember } = require('../../lib/logic')
const member = require('../models/members')

//INDEX 

module.exports = {

    index(req, res) {

        member.findAll((members) => {
            return res.render('Members/index', { members })
        })

    },

    create(req, res) {

        return res.render('Members/create') // rederizando pagina de criação de clientes
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

        let { avatarurl, nome, email, datanascimento, gender, blood, weight, height } = req.body


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
        ]

        member.post(values, (member) => {
            return res.redirect(`Members/${member.id}`)
        })

    },
    show(req, res) {

        member.find(req.params.id, (member) => {

            if (!member) return res.send('member not find')

            member.age = calcularIdade(member.datanascimento)
            member.created_at = calcularData(member.created_at).br

            return res.render('Members/show', { member })
        })

    },

    edit(req, res) {
        member.find(req.params.id, (member) => {

            if (!member) return res.send('member not find')

            member.datanascimento = calcularData(member.datanascimento).iso
            member.created_at = calcularData(member.created_at).br

            return res.render('members/edit', { member })
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

        let { avatarurl, nome, email, datanascimento, gender, blood, weight, height,id } = req.body


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
            id
        ]

        member.update(values, () => {

            return res.redirect(`Members/${req.body.id}`)
        })



    },

    delete(req, res) {
        member.delete(req.body.id, () => {

            return res.redirect(`/Members`)
        })
    }
}
