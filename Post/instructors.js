
//POST
module.exports = (req,res)=>{

    const keys = Object.keys(req.body) // pegando as chaves dos itens
        // E fazendo 1 array com elas 

        for(key of keys){

            keyisNull = req.body[key] == ""

            if(keyisNull)
                return res.send('"ternario não funcionou"')
        }

    return res.send(req.body)
}