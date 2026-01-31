# Testes de Performance com k6

Este diretório contém a automação de testes de performance para a API de gerenciamento veterinário, utilizando a ferramenta k6. A estrutura foi organizada para permitir tanto execuções isoladas quanto o uso de uma suite consolidada de cenários.

## Estrutura do Projeto

A organização do projeto foi estabelecida da seguinte forma:

- `config/`: Centralização de constantes e variáveis de ambiente (ex: `BASE_URL`).
- `data/`: Arquivos JSON com massas de dados estáticas (Data-Driven).
- `helpers/`: Funções modulares para autenticação, geração de dados (Faker) e seeders para o banco de dados.
- `scripts/`: Scripts de teste que representam fluxos de negócio da API.
- `load_test_suite.js`: Ponto de entrada para a execução simultânea de múltiplos cenários.

---

## Como Executar os Testes

O projeto foi configurado para permitir dois modelos principais de execução:

### 1. Execução Individual

A possibilidade de executar cada script de forma isolada, facilitando a validação de mudanças específicas em endpoints sem a necessidade de rodar a suite completa, foi mantida.

**Comando para execução do teste de listagem (getAll) de Animais:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=tests/k6/htmlReports/animal-get-all.html k6 run tests/k6/scripts/animal_get_all.js
```

**Comando para execução do teste de cadastro (POST) de Animais:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=tests/k6/htmlReports/animal-post.html k6 run tests/k6/scripts/animal_post.js
```

### 2. Suite de Testes

Uma suite de testes (`load_test_suite.js`) simples foi desenvolvida com o objetivo de demonstrar a execução de múltiplos cenários simultaneamente, simulando uma carga de trabalho próxima ao comportamento real em produção, onde múltiplos usuários realizam ações distintas de forma concorrente.

**Comando para execução da Suite:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_PERIOD=15s K6_WEB_DASHBOARD_EXPORT=tests/k6/htmlReports/suite-report.html k6 run tests/k6/load_test_suite.js
```

> [!NOTE]
>
> A variável `K6_WEB_DASHBOARD_PERIOD=15s` foi utilizada na execução da suite para garantir uma agregação de métricas mais suave, dado o maior volume de dados processados. Nos testes individuais, essa configuração foi dispensada por serem execuções mais curtas onde o valor padrão de 10s apresentou resultados adequados.


## Conceitos Aplicados

Abaixo são apresentados exemplos de como os conceitos foram implementados nas implementações:

### 1. Thresholds
Foram definidos critérios de aceitação técnica na suite `load_test_suite.js` para garantir que a API atenda aos SLAs esperados., com a utilização do `p(95)` para medir a latência e uma taxa máxima de erro permitida.
```js
thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% das reqs abaixo de 500ms
    'http_req_failed': ['rate<0.01'],    // Menos de 1% de falhas
}
```

### 2. Checks
No script `animal_get_all.js`, por exemplo, através da implementação do `check` foi possível validar o status HTTP e a integridade funcional mínima da resposta obtida.
```js
check(res, {
    'Status 200': (r) => r.status === 200,
    'duration < 500ms': (r) => r.timings.duration < 500,
});
```

### 3. Helpers
A modularização foi aplicada através de arquivos no diretório `helpers/`. Funções exportadas foram utilizadas para o reaproveitamento da lógica de autenticação, geração de dados e métodos auxiliares de configuração do setup.
```js
// helpers/auth.js
export function obterToken(email, password, role) {
    // ... lógica de registro e login
    return res.json('token');
}

export function obterHeaders(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
}
```

### 4. Trends
`Trends` foram implementados para isolar o tempo de resposta de transações específicas, permitindo a diferenciação das métricas globais do k6.
```js
const postAnimalDurationTrend = new Trend('post_animal_duration');
// ...
postAnimalDurationTrend.add(resCadastroAnimal.timings.duration);
```

### 5. Faker
Para garantir a utilização de dados dinâmicos e realistas, a biblioteca **Faker** foi integrada ao projeto através do helper `data_generator.js`.
```js
export function gerarDadosTutor() {
    return {
        nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: `tutor_${faker.internet.userName()}@tutor.com`,
        telefone: faker.phone.number(),
    };
}
```

### 6. Variável de Ambiente
Além da utilização de variáveis de ambiente diretamente via linha de comando, a variável de ambiente `__ENV` foi utilizada para conferir flexibilidade ao script, permitindo a alteração da base URL da API conforme ambiente de execução sem a necessidade de modificar o código fonte.
```js
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';
```

### 7. Stages
Estágios de carga foram configurados para simular o comportamento de *Ramp-up* e *Ramp-down* de usuários virtuais (VUs), conforme observado em `load_test_suite.js`, `animal_get_all.js` e `animal_post.js`.
```js
stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 10 },
    { duration: '10s', target: 0 },
]
```

### 8. Reaproveitamento de Resposta
Foi implementado o fluxo onde o identificador retornado no cadastro de um animal é extraído e utilizado em uma consulta `GET` subsequente, confirmando seu cadastro bem-sucedido e validando o ciclo completo do recurso.
```js
const body = resCadastroAnimal.json();
const resConsultaAnimal = http.get(`${BASE_URL}/animais/${body.id}`, params);
```

### 9. Token de Autenticação
Tokens JWT foram obtidos dinamicamente no `setup()` de cada script. Esses tokens são repassados aos VUs para garantir que todas as requisições privadas sejam devidamente autorizadas.
```js
const token = obterToken(email, password, 'recepcionista');
const params = obterHeaders(token);
//...
const resCadastroAnimal = http.post(`${BASE_URL}/animais`, JSON.stringify(dadosAnimal), params);
```

### 10. Data-Driven Testing
No arquivo `data_generator.js`, foi aplicado o conceito de teste orientado a dados através do carregamento de uma lista de raças a partir de um arquivo JSON externo, utilizando `SharedArray` para otimizar o uso da memória.
```js
export const racas = new SharedArray('racas', function () {
    return JSON.parse(open('../data/racas.json'));
});
```

### 11. Groups
O recurso `group` foi utilizado para organizar logicamente as requisições dentro dos scripts, facilitando a leitura de logs e a segmentação de métricas nos relatórios gerados.
```js
group('Cadastro de Animais', function () {
    // Código das requisições...
});
```

## Relatórios
Exemplos de relatórios gerados pelo k6 podem ser encontrados no diretório `tests/k6/htmlReports/`.

---

## Práticas Adicionais Utilizadas

Além dos requisitos básicos, outras boas práticas foram aplicadas ao projeto para otimizar a execução e resultados dos testes:

### 1. Pooling de Tokens para VUs
Um script de pooling de tokens foi implementado no `auth_seeder.js` e utilizado no `setup()`, evitando que todos os usuários virtuais compartilhem a mesma credencial. Cada VU recebe um token distinto de forma circular, simulando múltiplos funcionários operando simultaneamente a aplicação.

### 2. Seeders
Através de funções auxiliares em `helpers/`, o ambiente é preparado com a criação de tutores e animais antes da execução da carga de testes. Essa prática garante a idempotência dos testes e a disponibilidade de dados para validação.

### 3. Combinação de Cenários e Executores
Na suite principal (`load_test_suite.js`), foi utilizada a combinação de [diferentes executores (`ramping-vus` e `constant-vus`)](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/), permitindo simular simultaneamente o crescimento gradual de acessos e uma carga constante de transações.
