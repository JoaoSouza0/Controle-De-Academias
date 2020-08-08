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
    }
}