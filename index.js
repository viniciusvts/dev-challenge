/**
 * @author Vinicius de Santana
 * @description servidor node utilizando express, docker e MongoDB.
 * Aplicação criada para o desafio para dev júnior na QRPoint
 * npm install express body-parser mongoose bcrypt jsonwebtoken --save
 */
console.log("APP: Iniciando...");
/** configurações da aplicação */
const config = require('./config/config'); //APP: API em ambiente DEV||PROD
//express
const express = require('express');
/** instância do express */
const app = express();
/** porta aonde o server vai escutar */
const port = 8080;
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( { extended: true }));
app.use( bodyParser.json() );
//BD
console.log("BD: Start connection to BD")
/** instância para conexão com o banco de dados */
const mongoose = require('mongoose');
/** opções para configuração do banco */
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose.connect(config.mongodb, options, (err)=>{
    if(err){
        console.log("BD: Erro ao conectar >>>>>>\n", err);
    }
})
mongoose.connection.on('disconnected', ()=>{
    console.log("BD: desconectado");
})
mongoose.connection.on('connected', ()=>{
    console.log("BD: conectado");
    //se for a primeira vez que o sistema inicia, não há admin, então crio um
    Users = require("./model/userSchema");
    Users.findOne( {admin: true}, (err, data)=>{
        if (err) console.log(" APP: erro ao verificar existencia de admins");
        if (!data) {
            Users.create( {email:"admin@admin.com", pass: "admin", admin:true}, (err, data)=>{
                if (err) console.log(" APP: erro ao criar primeiro admin");
                console.log(" APP: primeiro admin criado");
                console.log(data);
            });
        } else {
            console.log(" APP: admin já existe.");
        }
    });
})

/** rota employer */
const employer = require('./routes/employer');
const usersRoute = require('./routes/usersRoute');

// app.use( '/', express.static('./www')) //conteúdo estático
app.use('/employer', employer);
app.use('/users', usersRoute);

app.listen(port, ()=>{
    console.log( "APP: Servidor escutando na porta " + port );
});

module.exports = app;