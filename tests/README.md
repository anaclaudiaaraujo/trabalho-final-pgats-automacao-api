# Testes Funcionais

Este diretório contém os testes funcionais da API Veterinária, abrangendo tanto a interface REST quanto a interface GraphQL.

## Estrutura de Testes

- `rest/`: Testes para a API REST.
  - `controller/`: Testes de nível de componente/controller.
  - `external/`: Testes de integração/ponta a ponta simulando chamadas externas.
- `graphql/`: Testes para a API GraphQL.
  - `controller/`: Testes de resolvers e lógica interna.
  - `external/`: Testes de integração via queries e mutations.

## Tecnologias

- **Mocha**: Framework de testes.
- **Chai**: Biblioteca de asserções.
- **Supertest**: Biblioteca para testar requisições HTTP.
- **Sinon**: Para criação de mocks e stubs.
- **Mochawesome**: Gerador de relatórios HTML.

## Como Executar

Antes de executar os testes, certifique-se de que as dependências de desenvolvimento foram instaladas:

```bash
npm install --save-dev mocha supertest chai mochawesome sinon
```

### Executar Todos os Testes
Para rodar todos os testes funcionais do projeto:
```bash
npm test
```

### Testes Específicos

#### API REST
- **Apenas Controllers:**
  ```bash
  npm run test:rest:controller
  ```
- **Apenas Testes Externos:**
  ```bash
  npm run test:rest:external
  ```

#### API GraphQL
- **Apenas Controllers/Resolvers:**
  ```bash
  npm run test:graphql:controller
  ```
- **Apenas Testes Externos:**
  ```bash
  npm run test:graphql:external
  ```

## Relatórios
Após a execução dos testes, um relatório detalhado em HTML será gerado na pasta `mochawesome-report/`. Você pode abrir o arquivo `mochawesome.html` em qualquer navegador para visualizar os resultados.
