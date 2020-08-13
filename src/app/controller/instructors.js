const { calcularIdade, calcularData, searchInstructor } = require('../../lib/logic')

//INDEX 

module.exports = {

    index(req, res) {
        return res.render('Instructors/index', { instructors })

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

        let { avatarUrl, nomeInstrutor, dataNascimento, gender, services } = req.body
        return

    },

    show(req, res) {

        return

    },

    edit(req, res) {
        return
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
        return

    },

    delete(req, res) {
        return

    }
}
