const { calcularIdade, calcularData, searchMembers } = require('../../lib/logic')


//INDEX 

module.exports = {

    index(req, res) {
        return res.render('members/index', { members })

    },
    create(req, res) {

        return res.render('members/create')
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
