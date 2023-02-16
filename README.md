
# API de controle de CPFs

Este é um projeto que foi desenvolvido como um desafio técnico para uma vaga de backend. A API é responsável por gerenciar uma lista restrita de CPFs, permitindo a adição, remoção e consulta desses CPFs.

# Contextualização do Problema

Atualmente o time de análise antifraude do ecommerce realiza um controle de CPFs em uma planilha eletrônica. Nesta planilha são adicionados CPFs com risco de fraude. Com o aumento da nossa base de clientes têm ﬁcado cada vez mais difícil manter o controle manual. Com isso o Product Owner do time levantou os principais requisitos funcionais para desenvolvimento de um sistema que controle os CPFs adicionado-os em uma lista restrita.

## Tecnologias utilizadas

- [Nest.js](https://nestjs.com/) - Framework para desenvolvimento de aplicações em Node.js.
- [Prisma](https://www.prisma.io/) - ORM para bancos de dados SQL e NoSQL.
- [Jest](https://jestjs.io/) - Biblioteca de testes em JavaScript.
- [Docker](https://www.docker.com/) - Plataforma para desenvolvimento, envio e execução de aplicações.
- [Swagger](https://swagger.io/) - Ferramenta para documentação de APIs.
- [Joi](https://joi.dev/) - Biblioteca para validação de dados.

## Como rodar a API

Para rodar a API, você precisará ter o [Docker](https://www.docker.com/) instalado na sua máquina. Se preferir, também é possível rodar a aplicação sem ele, basta seguir as instruções na seção "Rodando sem Docker".

1. Clone o repositório:

`git clone https://github.com/dev-luizf/cpf-control.git`

2. Entre na pasta do projeto:

`cd cpf-control`

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis::
```
POSTGRES_USER=usuario_desejado

POSTGRES_PASSWORD=sua_senha

POSTGRES_DB=nome_do_banco

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5433/${POSTGRES_DB}?schema=public"
```
5. Rode o Docker Compose:

`npm run compose:up`

4. Acesse a API em `http://localhost:3001`.

## Rodando sem Docker

Se você preferir não utilizar o Docker, siga as instruções abaixo.

1. Clone o repositório:

`git clone https://github.com/dev-luizf/cpf-control.git`

2. Entre na pasta do projeto:

`cd cpf-control`

3. Instale as dependências:

`npm install`

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

`DATABASE_URL="postgres://user:password@host:port/database?schema=schema_name"`

Exemplo: `DATABASE_URL="postgresql://luiz:123456@localhost:5432/cpf-control?schema=public"`

6. Inicie o servidor:

`npm run start`

7. Acesse a API em `http://localhost:3001`.

## Testes

A API possui testes unitários escritos com a biblioteca Jest. Para roda-los, execute o seguinte comando:

`npm run test`


## Uso

A API permite as seguintes operações:

-   Adicionar um CPF à lista restrita.
-   Listar todos os CPFs.
-   Buscar um CPF específico na lista
-   Remover um CPF da lista.

A documentação do projeto foi feita com Swagger e pode ser acessada em [http://localhost:3001/api](http://localhost:3000/api).

## Estrutura do projeto

Este projeto é estruturado basicamente em controllers, services e utils. Os controllers são responsáveis por receber as requisições e chamar os serviços correspondentes. Os services, por sua vez, são responsáveis por lidar com as regras de negócio da aplicação e realizar as operações no banco de dados. Já os utils contêm funções utilitárias que podem ser utilizadas em diferentes partes da aplicação.

Em relação ao tratamento de erros, a API utiliza diferentes tipos de exceções. Quando ocorrem erros de validação dos dados, como CPFs inválidos ou em formato incorreto, eles são tratados nos controllers e retornam um erro do tipo "InvalidCpfException". Já exceções relacionadas às regras de negócio, como CPFs duplicados ou CPFs que não existem na lista restrita, são tratados nos services.

Essa separação de responsabilidades permite que a aplicação seja mais organizada e fácil de manter, já que cada parte tem uma responsabilidade clara e bem definida. Além disso, o tratamento de erros específicos permite que a aplicação forneça mensagens mais claras e descritivas para os usuários em caso de problemas, o que ajuda a melhorar a experiência de uso da aplicação.
