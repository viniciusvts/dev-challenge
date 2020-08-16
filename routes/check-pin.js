const express = require('express');
/** Gerenciador de rotas do express */
const router = express.Router();
/** Schema do banco de dados */
const employerCheckPin = require('../model/check-pin');
/** midleware de autenticação */
const auth = require('../middlewares/auth');
/** apenas o nome da rota */
const route = "/check-pin/";
/** http response codes  */
const hr = require('../const/httpResp');

//rotas

/** 
 * @description retorna todos as entradas do employer para usuário autenticado
*/
router.get('/(:employerCode)?', auth.verify,(req, res)=>{
    console.log("APP: GET to: "+route+" from: " + req.ip); //logs
    userIsAdmin = res.locals.isAdmin;

    // nesse caso defino que somente usuários administradores tem acesso
    if (!userIsAdmin)
        return res.status(hr.NOT_AUTHORIZED).send({ error: "Usuário não autorizado" });

    // se enviou o employer_code retorno 1 resultado, caso negativo retorno todos
    if (typeof req.params.employerCode != 'undefined'){
        employerCheckPin.find({ member_code: req.params.employerCode }, (err, data)=>{
            if (err)
                return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro interno do servidor" });
            return res.send(data);
        });
    } else {
        employerCheckPin.find({ }, (err, data)=>{
            if (err)
            return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro interno do servidor" });
            return res.send(data);
        })
    };
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
    if (!obj.member_name ||
        !obj.member_code ||
        !obj.member_personal_data ||
        !obj.thumbnailHd ||
        !obj.birthday)
        return res.status(hr.BAD_REQUEST).send({ error: "Dados incorretos ou faltantes" });
    
    //verifico se já existe employer_code caso negativo adiciono o novo
    employerCheckPin.findOne( {member_code: obj.member_code}, (err, data)=>{
        if (err) return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro no banco" });
        if (data) return res.status(hr.BAD_REQUEST).send({ error: "Employer já existe" });

        employerCheckPin.create( obj, (err, data)=>{
            if (err) return res.status(hr.INT_SERVER_ERROR).send({ error: "Erro no banco" });
            return res.status(hr.CREATED).send(data);
        });
    });
});
//fim rotas


module.exports = router;