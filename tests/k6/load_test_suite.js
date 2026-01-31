import { group } from 'k6';
import { obterPoolDeTokensRecepcionista } from './helpers/auth_seeder.js';
import { criarTutor } from './helpers/tutor_seeder.js';
import { cadastrarAnimais } from './helpers/animal_seeder.js';

import animal_get_all from './scripts/animal_get_all.js';
import animal_post from './scripts/animal_post.js';

export const options = {
    scenarios: {
        scenario_get_all: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '1m', target: 10 },
                { duration: '10s', target: 0 },
            ],
            exec: 'runGetAll',
        },
        scenario_post_animal: {
            executor: 'constant-vus',
            vus: 5,
            duration: '1m',
            startTime: '10s',
            exec: 'runPostAnimal',
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
        'get_all_animals_duration': ['p(95)<500'],
        'post_animal_duration': ['p(95)<300']
    },
};

export function setup() {
    console.log('--- Iniciando Setup da Suite ---');

    const tokens = obterPoolDeTokensRecepcionista(10);
    const tokenPrincipal = tokens[0];

    const idTutor = criarTutor(tokenPrincipal);
    cadastrarAnimais(tokenPrincipal, idTutor, 50);

    console.log('--- Setup da Suite Concluído ---');

    return {
        tokens: tokens,
        tokenPrincipal: tokenPrincipal,
        token: tokenPrincipal,
        idTutor: idTutor
    };
}

export function runGetAll(data) {
    animal_get_all(data);
}

export function runPostAnimal(data) {
    animal_post(data);
}
