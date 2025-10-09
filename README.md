# API Veterinária - Gestão de Prontuários (Fundação)

Descrição
--------

Projeto base para uma API REST que gerencia tutores, animais e prontuários de uma clínica veterinária. Os dados são armazenados em memória (arrays dentro de `src/common/models`) — este é um esqueleto para facilitar o desenvolvimento e integração futura com uma camada persistente (banco de dados) e uma API GraphQL.

Tecnologias utilizadas
----------------------

- Node.js
- Express
- Swagger (swagger-jsdoc + swagger-ui-express)

Estrutura de arquivos
---------------------

src/
- common/
  - models/        -> Modelos em memória (arrays) e contadores de ID
  - services/      -> Regras de negócio e operações CRUD (sem dependência de HTTP)
- rest/
  - controllers/   -> Conectam services às requisições HTTP (req/res)
  - routes/        -> Definição dos endpoints REST (com JSDoc para Swagger)
  - config/        -> Configuração do Swagger
  - app.js         -> Configuração do Express e middleware (não inicia o servidor)
  - server.js      -> Inicializa o servidor
- graphql/         -> Placeholder vazio para futura API GraphQL
- graphql/         -> Implementação da API GraphQL (typeDefs, resolvers, context, app e server)

Como executar
-------------

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor REST (com nodemon):

```bash
npm run start:rest
```

3. Dependências necessárias para GraphQL (recomendado):

```bash
npm install apollo-server-express graphql
```

4. (Opcional para desenvolvimento) Instale dependências para testes:

```bash
npm install --save-dev nodemon supertest
```

5. Inicie o servidor GraphQL (ou use o script npm):

```bash
npm run start:apollo
```

Endpoints principais
-------------------

Base da API: http://localhost:3000/api

- /api/tutores
- /api/animais
- /api/prontuarios

Base da API GraphQL: http://localhost:4000/graphql

Documentação Swagger
---------------------

A documentação interativa da API está disponível em:

http://localhost:3000/api-docs

Observações
-----------

Este projeto guarda dados apenas em memória. Reiniciar a aplicação limpará todos os dados. A pasta `src/graphql` foi criada como placeholder para a implementação futura de uma API GraphQL.

Notas para a API GraphQL:
- Os typeDefs estão em `src/graphql/typeDefs.js`.
- Os resolvers estão em `src/graphql/resolvers.js` e chamam os services em `src/common/services`.
- O app da GraphQL (`src/graphql/app.js`) exporta uma função assíncrona que retorna a instância do Express (sem chamar `listen()`), facilitando testes com Supertest.

Scripts relacionados:
- `npm run start:apollo` - inicia o servidor GraphQL (usa `src/graphql/server.js`).
- `npm run start:rest` - inicia o servidor REST (usa `src/rest/server.js`).

Dependências adicionais sugeridas:
- `apollo-server-express` e `graphql` (já adicionadas nas instruções acima).

