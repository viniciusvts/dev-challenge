/**
 * códigos de resposta http
 * @url https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
 */
const httpResp = {
    /**OK 200*/
    OK: 200,
    /**Criado 201*/
    CREATED: 201,
    /**movido permanentimente 301*/
    MOVED_PERM: 301,
    /**movido temporariamente 302*/
    FOUND: 302,
    /**sintaxe invalida 400*/
    BAD_REQUEST: 400,
    /** Não autenticado 401*/
    NOT_AUTHORIZED: 401,
    /**Autenticado mas não autorizado 403*/
    FORBIDDEN: 403,
    /**Erro interno do servidor 500*/
    INT_SERVER_ERROR: 500
};
module.exports = httpResp;