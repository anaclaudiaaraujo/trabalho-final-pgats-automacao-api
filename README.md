# API Veterinária - Gestão de Prontuários

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)

Este projeto é uma API para gestão de uma clínica veterinária, permitindo o controle de tutores, animais e prontuários. Ele serve como base para estudos de integração entre diferentes padrões de API (REST e GraphQL) e práticas avançadas de testes de software e performance.

## Sumário

- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Executar as APIs](#-como-executar-as-apis)
- [Como Executar os Testes](#-como-executar-os-testes)
- [Relatórios](#-relatórios)
- [Observações](#-observações)

## Arquitetura

A aplicação utiliza uma estrutura modular onde a lógica de negócio é centralizada no diretório `common`, permitindo que múltiplas interfaces de comunicação (REST e GraphQL) consumam os mesmos serviços e modelos.

## Tecnologias

- **Runtime**: Node.js (v18+)
- **Framework Web**: Express
- **Query Language**: GraphQL (Apollo Server)
- **Documentação**: Swagger
- **Testes Funcionais**: Mocha, Chai e Supertest
- **Testes de Performance**: k6
- **Relatórios**: Mochawesome & k6 Web Dashboard

## Estrutura de Arquivos

```text
├── src/
│   ├── common/     # Modelos de dados e serviços (Lógica de Negócio)
│   ├── rest/       # Implementação da API REST (Rotas, Controllers)
│   └── graphql/    # Implementação da API GraphQL (Schemas, Resolvers)
├── tests/
│   ├── rest/       # Testes funcionais REST (Mocha/Supertest)
│   ├── graphql/    # Testes funcionais GraphQL (Mocha/Supertest)
│   └── k6/         # Scripts de performance (k6)
└── .env.example    # Template de variáveis de ambiente
```

## Como Executar as APIs

### 1. Instalação e Configuração

Certifique-se de ter o Node.js e o npm instalados.

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

> [!NOTE]
> Edite o arquivo `.env` para ajustar a `JWT_SECRET` e as portas se necessário.

### 2. Inicialização

Você pode rodar as APIs de forma independente:

- **API REST (Padrão: Porta 3000):**
  ```bash
  npm run start:rest
  ```
  *Documentação Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)*

- **API GraphQL (Padrão: Porta 4000):**
  ```bash
  npm run start:apollo
  ```
  *Playground GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)*

---

## Como Executar os Testes

Este projeto possui uma suite completa de testes funcionais e de performance.

### 1. Testes Funcionais (Mocha)

Para rodar todos os testes funcionais (REST e GraphQL):
```bash
npm test
```

Para rodar suites específicas:
- `npm run test:rest:external`: Testes de integração REST.
- `npm run test:graphql:external`: Testes de integração GraphQL.

Consulte o [README de Testes Funcionais](tests/README.md) para mais detalhes.

### 2. Testes de Performance (k6)

Os testes de performance devem ser executados via linha de comando k6. Exemplo:
```bash
k6 run tests/k6/load_test_suite.js
```

Para detalhes sobre cenários, métricas e dashboards, consulte o [README dos Testes de Performance](tests/k6/README.md).

---

## Relatórios

- **Funcionais**: Após rodar `npm test`, o relatório HTML é gerado em `mochawesome-report/mochawesome.html`.
- **Performance**: O k6 pode gerar dashboards em tempo real ou relatórios HTML estáticos (veja as instruções no [README dos Testes de Performance](tests/k6/README.md)).

## ⚠️ Observações

- **Persistência**: Atualmente os dados são armazenados exclusivamente em memória. Toda vez que o servidor é reiniciado, os dados são resetados para o estado inicial.
- **Segurança**: Os endpoints protegidos utilizam JWT. As credenciais de teste são geradas dinamicamente pelos scripts de teste ou podem ser criadas manualmente via endpoints de registro.
