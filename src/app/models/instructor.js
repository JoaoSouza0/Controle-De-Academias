const db = require('../../config/db')
const { calcularIdade, calcularData, searchInstructor } = require('../../lib/logic')



module.exports = {

    findAll(callBack) {

        db.query('SELECT * FROM INSTRUCTORS', (err, results) => {

            if (err) {
                throw (err)
            }

            callBack(results.rows)

        })

    },
    find(id, callBack) {


        db.query('SELECT * FROM INSTRUCTORS INSTRUCTORS WHERE id = $1', [id], (err, results) => {

            if (err) {

                throw (err)
            }

            callBack(results.rows[0])

        })

    },
    post(values, callBack) {

        const query = `
        INSERT INTO instructors (
            name,
            Avatarurl,
            datanascimento,
            gender,
            created_at,
            services
        ) values ($1,$2, $3, $4, $5,$6)
        RETURNING id
        `
        db.query(query, values, (err, result) => {

            if (err) {
                throw (err)
            }

            callBack(result.rows[0])

        })

    },
    update(data, callBack) {

        const query = `
        UPDATE instructors SET
            avatarurl = ($1),
            name = ($2),   
            datanascimento = ($3),
            gender = ($4),
            services = ($5)
            
        WHERE id = $6
        `

        const values = [ 
            data.avatarUrl,
            data.nomeInstructor,
            calcularData(data.dataNascimento).iso,
            data.gender,
            data.services,
            data.id
        ]
        db.query(query, values, (err, results) => {

            if (err) {
                throw (err)
            }

        })
        callBack()
    },
    delete(id,callBack){

        db.query(`DELETE FROM instructors WHERE id = $1`,[id], (err, results) => {

            if (err) {
                throw (err)
            }

          callBack()

        })
    }

}