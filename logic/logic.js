module.exports = {

    calcularIdade :function (timestamp) {
        const today = new Date
        const dataNascimento = new Date(timestamp)

        let age = today.getFullYear() - dataNascimento.getFullYear()
        let month = today.getMonth() - dataNascimento.getMonth()

        if (month <= 0 || month == 0 && today.getDate <= dataNascimento.getDate) {
            age = age - 1
        }
        return age
    },
    calcularData: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month= `0${date.getUTCMonth()+1.}`.slice(-2)
        const Day= `0${date.getUTCDate()}`.slice(-2)

        return{ 
            birthDay:`${Day}/${month}`,
            iso:`${year}-${month}-${Day}`}
    }
}