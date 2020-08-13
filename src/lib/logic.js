const data = require('../data.json')

module.exports = {

    calcularIdade(timestamp) {
        const today = new Date
        const dataNascimento = new Date(timestamp)

        let age = today.getFullYear() - dataNascimento.getFullYear()
        let month = today.getMonth() - dataNascimento.getMonth()

        if (month <= 0 || month == 0 && today.getDate <= dataNascimento.getDate) {
            age = age - 1
        }
        return age
    },
    calcularData(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1.}`.slice(-2)
        const Day = `0${date.getUTCDate()}`.slice(-2)

        return {
            birthDay: `${Day}/${month}`,
            iso: `${year}-${month}-${Day}`
        }
    },
    searchInstructor(id, res) {

        let index = 0
        const encontrarEstrutor = data.instructors.find(function (instructor,foundIndex) { //função que vai validar o instrutor   
            // função find para percoorer os dados a procura dele
            
          if (id == instructor.id)//validando se é o id certo passado no parametro a cima
          {
              index = foundIndex
              return true
          }
        })

        if (!encontrarEstrutor) return res.send('Não encontrei')

        return { encontrarEstrutor, index }
    },
    searchMembers(id, res) {

        let index = 0
        const searchMember = data.members.find((member,foundIndex) => { //função que vai validar o instrutor   
            // função find para percoorer os dados a procura dele
          if (id == member.id)//validando se é o id certo passado no parametro a cima
          {
              index = foundIndex
              return true
          }
        })

        if (!searchMember) return res.send('Não encontrei')

        return { searchMember, index }
    }
}