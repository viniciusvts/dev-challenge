# Hello QRPoint!

Responta do desafio proposto pela QRPoint para o cargo de dev Jr
Adicionei prints para entender como as requisições são formadas com o postman na pasta screenshots

- Utilizar Docker (OK)
- Autenticação nas requisições (OK) > screenShot 01
- Utilizar cache :(


## GET `/employer/{employerCode}`
> Foi criado o método para a requisição com o employerCode (screenshot 05) além da requisição sem o employerCode, este retorna todos os dados do banco.
> Ambas as requisições necessitam que o solicitante faça login e envie o token no header "Authorization".
> O Exemplo para a crição de um novo registro pode ser visualizado no screenshot 03

### POST `/check-pin/{employerCode}`
> O enunciado ficou confuso pq mostra que o endpoint receberá um código tanto no corpo do POST quanto na url o que parece um GET, sinal que não entendi muito bem, por isso após o endpoint que cria um novo registro através de POST (screenshot 06), fiz o endpoint que faz um GET com o codigo pela url (screenshot 07).

### POST `/submit-medical-license`
> A criação do endpoint do medical-licence seguiu com autenticação e o exemplo para a requisição no postman está no screenshot 08

### GET `/medical-licenses`
> A criação do endpoint do medical-licence seguiu com autenticação e o exemplo para a requisição no postman está no screenshot 09
