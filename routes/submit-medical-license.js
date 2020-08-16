const express = require('express');
/** Gerenciador de rotas do express */
const router = express.Router();
/** Schema do banco de dados */
const medicallicense = require('../model/submit-medical-license');
/** midleware de autenticação */
const auth = require('../middlewares/auth');
/** apenas o nome da rota */
const route = "/submit-medical-license/";
/** http response codes  */
const hr = require('../const/httpResp');

//rotas

/** 
 * @description retorna todos as entradas do employer para usuário autenticado
*/
router.get('/', auth.verify,(req, res)=>{
    console.log("APP: GET to: "+route+" from: " + req.ip); //logs
    userIsAdmin = res.locals.isAdmin;

    // nesse caso defino que somente usuários administradores tem acesso
    if (!userIsAdmin)
        return res.status(hr.NOT_AUTHORIZED).send({ error: "Usuário não autorizado" });

    //pega todo o conteúdo
    medicallicense.find({ }, (err, data)=>{
        if (err)
            return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro interno do servidor" });
        return res.send(data);
    });
})

/**
 * @description cria uma nova entrada de employer no BD
 * verifica se foi recebido dados suficientes
 * procura se já existe alguma postagem com titulo igual
 * lança nova postagem no BD e retorna a postagem
 */
router.post('/', auth.verify, (req, res)=>{
    console.log("APP: POST to: "+route+" from: " + req.ip); //logs
    userIsAdmin = res.locals.isAdmin;
    const obj = req.body;

    // nesse caso defino que somente usuários administradores tem acesso
    if (!userIsAdmin)
        return res.status(hr.NOT_AUTHORIZED).send({ error: "Usuário não autorizado" });

    //valida os campos
    if (!obj.initial_date ||
        !obj.final_date ||
        !obj.time ||
        !obj.member_code)
        return res.status(hr.BAD_REQUEST).send({ error: "Dados incorretos ou faltantes" });
    
    //adiciona ao banco a informação
    medicallicense.create( obj, (err, data)=>{
        if (err) return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro no banco" });
        return res.status(hr.CREATED).send(data);
    });
});
//fim rotas


module.exports = router;