import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { Trend } from 'k6/metrics';
import { obterPoolDeTokensRecepcionista } from '../helpers/auth_seeder.js';
import { obterHeaders } from '../helpers/auth.js';
import { criarTutor } from '../helpers/tutor_seeder.js';
import { cadastrarAnimais } from '../helpers/animal_seeder.js';
import { BASE_URL } from '../config/constants.js';

const getAllAnimalsDurationTrend = new Trend('get_all_animals_duration');

export const options = {
    stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export function setup() {
    const tokens = obterPoolDeTokensRecepcionista(10);
    const mainToken = tokens[0];
    const tutorId = criarTutor(mainToken);
    cadastrarAnimais(mainToken, tutorId, 150);

    return { tokens: tokens };
}

export default function (data) {
    const tokenIndex = (__VU - 1) % data.tokens.length;
    const token = data.tokens[tokenIndex];

    group('Consulta de Animais', function () {
        const params = obterHeaders(token);
        const res = http.get(`${BASE_URL}/animais`, params);

        getAllAnimalsDurationTrend.add(res.timings.duration);

        check(res, {
            'Status 200': (r) => r.status === 200,
            'duration < 500ms': (r) => r.timings.duration < 500,
        });
    });

    sleep(randomIntBetween(1, 5));
}