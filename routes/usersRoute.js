const express = require('express');
/** Gerenciador de rotas do express */
const router = express.Router();
/** Schema do banco de dados */
const Users = require('../model/userSchema');
/** Encripta os dados para o banco */
const bcrypt = require('bcrypt');
/** midleware de autenticação */
const auth = require('../middlewares/auth');
/** apenas o nome da rota */
const route = "/users/";
/** http response codes  */
const hr = require('../const/httpResp');

//rotas

/** 
 * @description retorna todos os users do banco caso o user seja adm
 * retorna só o próprio user caso seja user comum
*/
router.get('/', auth.verify,(req, res)=>{
    console.log("APP: GET to: "+route+" from: " + req.ip); //logs

    userId = res.locals.token_id.id;
    userIsAdmin = res.locals.isAdmin;
    console.log("user: "+userId );
    if(userIsAdmin){
        Users.find({}, (err, data)=>{
            if (err) return res.status(hr.INT_SERVER_ERROR).send( {error: "erro na consulta"} );
            return res.send(data);
        });
    }else{
        //se não for admin
        Users.findOne( {_id: userId }, (err, data)=>{
            if (err) return res.status(hr.INT_SERVER_ERROR).send( {error: "erro na consulta"} );
            return res.send(data);
        });
    }
});

/**
 * @description cria novo usuário no banco
 * verifica se foi recebido dados suficientes
 * procura se já existe usuário no banco
 * lança novo usuário no banco e retorna esse usuário (sem a senha).
 */
router.post('/', auth.verify, (req, res)=>{
    console.log("APP: POST to: "+route+" from: " + req.ip); //logs
    userId = res.locals.token_id.id;
    userIsAdmin = res.locals.isAdmin;
    console.log("user: "+userId );
    if( userIsAdmin ){
        const obj = req.body;
        if (!obj.email || !obj.pass)
            return res.status(hr.BAD_REQUEST).send({error: "Dados incorretos ou faltantes"});
        Users.findOne( {email: obj.email}, (err, data)=>{
            if (err) return res.status(hr.INT_SERVER_ERROR).send( {error: "Erro no banco"});
            if (data) return res.status(hr.BAD_REQUEST).send( {error: "Usuário já existe"});

            Users.create( obj, (err, data)=>{
                if (err) return res.status(hr.INT_SERVER_ERROR).send( {error: "Erro no banco"});
                data.pass = undefined;
                return res.status(hr.CREATED).send( data );
            });
        });
    }
    //se o usuário solicitante não for admin
    res.status(hr.NOT_AUTHORIZED).send( {error: "Usuário não autorizado"});
});

/**
 * @description autenticar usuário
 */
router.post('/auth', (req, res)=>{
    console.log("APP: POST to: "+route+"auth from: " + req.ip); //logs
    const obj = req.body;
    if (!obj.email || !obj.pass)
        return res.status(hr.BAD_REQUEST).send({error: "Dados incorretos ou faltantes"});
    Users.findOne( {email: obj.email}, (err, data)=>{
        if (err) return res.status(hr.INT_SERVER_ERROR).send( {error: "Erro no banco"});
        if (!data) return res.status(hr.NOT_AUTHORIZED).send( {error: "Usuário/Senha não existe"});
        
        bcrypt.compare(obj.pass, data.pass,(err, same)=>{
            if (err) {
                return res.status(hr.INT_SERVER_ERROR).send( {error: "Falha ao comparar senha"});
            } else if (!same) {
                return res.status(hr.NOT_AUTHORIZED).send( {error: "Usuário/Senha incorreto"});
            } else {
                var jwtToken = auth.create( {id: data.id} );
                console.log('jwt', jwtToken);
                return res.send({ token: jwtToken });
            }
        });
    }).select('pass'); //força o select do password
});
//fim rotas

module.exports = router;