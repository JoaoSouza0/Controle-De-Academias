const db = require('../../config/db')
const { calcularIdade, calcularData, searchInstructor } = require('../../lib/logic')
const { off } = require('../../config/db')



module.exports = {

    findAll(callBack) {

        db.query(`SELECT instructors.*, count (members) AS total_students 
                FROM INSTRUCTORS 
                LEFT JOIN members on(instructors.id = members.instructor_id)
                GROUP BY instructors.id     
                ORDER BY total_students DESC
`, (err, results) => {
            if (err) {
                throw (err)
            }

            callBack(results.rows)

        })

    },
    findBy(filter, callBack){

        db.query(`SELECT instructors.*, count (members) AS total_students 
        FROM INSTRUCTORS 
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        WHERE instructors.name ILIKE '%${filter}%'
        OR instructors.services ILIKE '%${filter}%'
        GROUP BY instructors.id     
        ORDER BY total_students DESC

`, (err, results) => {
    if (err) {
        throw (err)
    }

    callBack(results.rows)

})
    },
    find(id, callBack) {


        db.query('SELECT * FROM INSTRUCTORS WHERE id = $1', [id], (err, results) => {

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
    delete(id, callBack) {

        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err, results) => {

            if (err) {
                throw (err)
            }

            callBack()

        })
    },
    pagenate(params)
    {
        const { filter, limit, offset, callBack} = params

        let query = "",
        filterQuery = "",
        totalQuery =`(
            SELECT count(*) FROM instructors
        ) AS total
        `

        if(filter){

            filterQuery = ` 
                WHERE instructors.name ILIKE '%${filter}%'
                OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count (*) FROM instructors
            ${filterQuery}
            ) AS total`

        }

        query = `SELECT instructors.*, ${totalQuery}, count(members) as total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        ${filterQuery}
        GROUP BY instructors.id LIMIT $1 OFFSET $2` 

        db.query(query,[limit,offset], (err, result)=>{

            if(err){
                throw `Data base error ${err} `
            }

            callBack(result.rows)
        })

    }

}