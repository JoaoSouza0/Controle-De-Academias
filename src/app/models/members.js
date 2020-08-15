const db = require('../../config/db')
const { calcularIdade, calcularData, searchmember } = require('../../lib/logic')



module.exports = {

    findAll(callBack) {

        db.query('SELECT * FROM MEMBERS', (err, results) => {

            if (err) {
                throw (err)
            }

            callBack(results.rows)

        })

    },
    find(id, callBack) {


        db.query('SELECT * FROM MEMBERS WHERE id = $1', [id], (err, results) => {

            if (err) {

                throw (err)
            }

            callBack(results.rows[0])

        })

    },
    post(values, callBack) {

        const query = `
        INSERT INTO members (
            avatarurl,
            name,
            email,
            datanascimento,
            gender,
            blood,
            weight,
            height,
            create_at
        ) values ($1,$2, $3, $4, $5, $6, $7, $8, $9)
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
        UPDATE members SET
        avatarurl = ($1),
        name = ($2),
        email = ($3),
        datanascimento = ($4),
        gender = ($5),
        blood = ($6),
        weight = ($7),
        height = ($8),
        create_at = ($9)

        WHERE id = $10
        `
        db.query(query, data, (err, results) => {

            if (err) {
                throw (err)
            }

        })
        callBack()
    },
    delete(id, callBack) {

        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {

            if (err) {
                throw (err)
            }

            callBack()

        })
    }

}