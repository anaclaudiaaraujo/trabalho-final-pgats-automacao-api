import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { obterToken, obterHeaders } from '../helpers/auth.js';
import { gerarDadosAnimal, gerarDadosRecepcionista, racas } from '../helpers/data_generator.js';
import { criarTutor } from '../helpers/tutor_seeder.js';
import { BASE_URL } from '../config/constants.js';

const postAnimalDurationTrend = new Trend('post_animal_duration');
const getAnimalDurationTrend = new Trend('get_animal_duration');

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
        'post_animal_duration': ['p(95)<200', 'p(99)<300'],
        'get_animal_duration': ['p(95)<200', 'p(99)<300']
    },
};

export function setup() {
    const userCredentials = gerarDadosRecepcionista();
    const token = obterToken(userCredentials.email, userCredentials.password, 'recepcionista');
    const idTutor = criarTutor(token);

    return { token: token, idTutor: idTutor };
}

export default function (data) {
    const { token, idTutor } = data;
    const raca = racas[Math.floor(Math.random() * racas.length)];
    const params = obterHeaders(token);

    group('Cadastro de Animais', function () {
        const dadosAnimal = gerarDadosAnimal(raca, idTutor);
        const nomeAnimal = dadosAnimal.nome;
        const resCadastroAnimal = http.post(`${BASE_URL}/animais`, JSON.stringify(dadosAnimal), params);

        postAnimalDurationTrend.add(resCadastroAnimal.timings.duration);

        const checkCadastroAnimal = check(resCadastroAnimal, {
            'Animal criado com sucesso - 201': (r) => r.status === 201,
        });

        if (checkCadastroAnimal) {
            const body = resCadastroAnimal.json();
            const resConsultaAnimal = http.get(`${BASE_URL}/animais/${body.id}`, params);

            getAnimalDurationTrend.add(resConsultaAnimal.timings.duration);

            check(resConsultaAnimal, {
                'Animal consultado com sucesso - 200': (r) => r.status === 200,
                'Nome do animal é o esperado': (r) => r.json('nome') === nomeAnimal
            });
        }
    });

    sleep(1);
}
