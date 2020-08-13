![QRPoint](https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1-150x150.png)

# Desafio Backend QRPoint

O desafio consiste em criar uma API REST que será consumida por um app (Android ou iOS), para obtenção e submissão de atestados do colaborador em um determinado empregador.

O desafio pode ser realizado nas linguagens: Go, Scala, Java, JavaScript(NodeJS), TypeScript(NodeJS) ou Python.

O candidato deve dar **fork** neste repositório e após o termino do desenvolvimento, realizar um **pull request** para análise do time.


### Extra
- Utilizar Docker
- Autenticação nas requisições
- Utilizar cache


### GET `/employer/{employerCode}`
Este método receberá um código de empregador e o validará retornando os seguintes dados:

```json
{
   "employer_name": "Academia Jedi",
   "employer_code": "4FqeyPrcbGNX",
   "member_count": 5,
   "thumbnail": "https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1.png",
   "register_date": "04/09/2019"
}
```

| Campo          | Tipo   |
|----------------|--------|
| employer_name  | String |
| employer_code  | String |
| member_count   | int    |
| thumbnail      | String |
| register_date  | String |



### POST `/check-pin/{employerCode}`
Este método receberá um código pin no corpo da seguinte maneira: 

```json
{
    "pin_code": "12345"
}
```

O código do empregador obtido anteriormente será passado na url junto com a requisição, o validará retornando os seguintes dados:

```json
{
   "member_name": "Lucas Skywalker",
   "member_code": 1,
   "member_personal_data": {
       "father": "Anaquim Skywalker",
       "mother": "Pâmela Amidala",
       "hand": false
   },
   "thumbnailHd": "https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1.png",
   "birthday": "04/05/1999"
}
```

- Member

| Campo                 | Tipo       |
|-----------------------|------------|
| member_name           | String     |
| member_code           | int        |
| member_personal_data  | MemberData |
| pin_code              | String     |
| birthday              | String     |

- MemberData

| Campo  | Tipo       |
|--------|------------|
| father | String     |
| mother | String     |
| hand   | boolean    |


### POST `/submit-medical-license`
Este método receberá os parâmetros de data de início, data de fim, duração (em minutos) e o código do membro na requisição, após isso, deve escrever os dados de atestado médico no banco.

```json
{
    "initial_date": "01/10/2019",
    "final_date": "03/10/2019",
    "time": 65,
    "member_code": 1
}
```

| Campo        | Tipo       |
|--------------|------------|
| initial_date | String     |
| final_date   | String     |
| time         | int        |
| member_code  | int        |


### GET `/medical-licenses`
Este método retornará todos os atestados médicos criados.

```json
[
    {
        "initial_date": "01/10/2019",
        "final_date": "03/10/2019",
        "time": 65
    },
    {
        "inicial_date": "05/09/2019",
        "end_date": "05/10/2019",
        "time": 480
    }
]
```
