const env = 'prod'; 

const config = () => {
    switch (env)
    {
        case 'dev':
        return{
            /** url do banco */
            mongodb: 'mongodb://localhost:27017/test',
            /** Token para criptografar as senhas no banco */
            jsonWebToken: 'senhaSegura(ouNao)',
            /** Tempo para o jsonWebToken expirar */
            jsonWebTokenExpiresTime: "5m"
        }

        case 'prod':
        return{
            mongodb: 'mongodb://mongodb:27017/app',
            jsonWebToken: 'outraSenhaSegura(ouNaoTbm)',
            jsonWebTokenExpiresTime: "1h"
        }
    }
}

console.log(console.log( "APP: API em ambiente "+ env.toUpperCase() ) );
module.exports = config();