const fs = require('fs') //chamando filse server (fs) para conseguir manipular arquivos 
const data = require('../data.json')
//POST
module.exports = (req, res) => {

    const keys = Object.keys(req.body) // pegando as chaves dos itens
    // E fazendo 1 array com elas 
    let { avatarUrl, nomeInstrutor, dataNascimento, gender, services } = req.body // desestruturando o array body

    for (key of keys) {  // validando se todos os campos estão preenchidos

        keyisNull = req.body[key] == ""

        if (keyisNull)
            return res.send('Por favor preencher todos os itens')
    }


    dataNascimento = Date.parse(dataNascimento)
    const create_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatarUrl,
        nomeInstrutor,
        gender,
        services,
        dataNascimento,
        create_at
    }) //adicionando objetos no array instructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
/*         criando arquivo('nome do arquivo', ('converter dados do body para jason', null, 'indentação),' 
            função de callback
 */        if (error) { //caso de erro enviar

            return res.send('Deu algum erro ao gerar o arquivo mano')
        }

        return res.redirect('/Instructors')//caso de sucesso redirecionar. 
    })

}