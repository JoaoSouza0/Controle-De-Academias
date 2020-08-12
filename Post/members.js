const fs = require('fs') //chamando filse server (fs) para conseguir manipular arquivos 
const data = require('../data.json')
const { calcularIdade, calcularData } = require('../logic/logic')


//INDEX

exports.index = (req, res) => {

    return res.render('members/index', { members: data.members })
}

//CREATE

exports.create = (req, res) => {
    return res.render('members/create')
}

//SHOW

exports.show = (req, res) => { // criando rota para mostras as infos

    const { id } = req.params // pegando o parametro id

    const searchMember = data.members.find(function (member) { //função que vai validar o    
        // função find para percoorer os dados a procura dele
        return id == member.id//validando se é o id certo passado no parametro a cima
    })

    if (!searchMember) return res.send('Não encontrei') //caso não encontre

    const members = {
        ...searchMember, // espaçando o array
        dataNascimento: calcularData(searchMember.dataNascimento).birthDay // formatando a idade com base na data de nascimento
        
    }

    return res.render('../views/members/show', { infos: members })
}

//Create

exports.edit = (req, res) => {

    const { id } = req.params // pegando o parametro id

    const searchMember = data.members.find(function (member) { //função que vai validar o    
        // função find para percoorer os dados a procura dele
        return id == member.id//validando se é o id certo passado no parametro a cima


    })

    if (!searchMember) return res.send('Não encontrei') //caso não encontre

    members = {
        ...searchMember,
        dataNascimento: calcularData(searchMember.dataNascimento).iso

    }

    return res.render('members/edit', { member: members }) //passando esse array para a pagina
}

//POST
exports.post = (req, res) => {

    const keys = Object.keys(req.body) // pegando as chaves dos itens
    // E fazendo 1 array com elas 
    let { avatarUrl, nome, dataNascimento, gender, email, weight, height, blood } = req.body // desestruturando o array body

    for (key of keys) {  // validando se todos os campos estão preenchidos

        keyisNull = req.body[key] == ""

        if (keyisNull)
            return res.send('Por favor preencher todos os itens')
    }


    dataNascimento = Date.parse(dataNascimento)
    const id = Number(data.members.length + 1)

    data.members.push({
        id,
        avatarUrl,
        nome,
        gender,
        dataNascimento,
        email,
        weight,
        height,
        blood
    }) //adicionando objetos no array members

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => {
/*         criando arquivo('nome do arquivo', ('converter dados do body para jason', null, 'indentação),' 
            função de callback
 */        if (error) { //caso de erro enviar

            return res.send('Deu algum erro ao gerar o arquivo mano')
        }

        return res.redirect(`/members/${id}`)//caso de sucesso redirecionar. 
    })

}

//ATUALIZAR

exports.put = (req, res) => {
    const { id } = req.body // pegando o parametro id
    let index = 0

    const searchMember = data.members.find(function (member, foundIndex) { //função que vai validar o    
        // função find para percoorer os dados a procura dele
        if (id == member.id)//validando se é o id certo passado no parametro a cima
        {
            index = foundIndex
            return true
        }
    })

    if (!searchMember) return res.send('Não encontrei') //caso não encontre

    const member = {

        ...searchMember,
        ...req.body,
        dataNascimento: Date.parse(req.body.dataNascimento),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error bro')

        return res.redirect(`/members/${id}`)
    })

}

//DELETAR 

exports.delete = (req, res) => {

    const { id } = req.body

    const filter = data.members.filter(() => {
        return members.id != id
    })

    data.members = filter

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {

        if (err) return res.send("Write file error")

        return res.redirect('/members')
    })

}