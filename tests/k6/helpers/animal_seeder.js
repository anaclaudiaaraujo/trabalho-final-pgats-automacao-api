import http from 'k6/http';
import { gerarDadosAnimal, racas } from './data_generator.js';
import { BASE_URL } from '../config/constants.js';
import { obterHeaders } from './auth.js';

export function cadastrarAnimais(token, idTutor, quantidade = 100) {
    const params = obterHeaders(token);

    console.log(`Cadastrando ${quantidade} animais...`);
    for (let i = 0; i < quantidade; i++) {
        const raca = racas[Math.floor(Math.random() * racas.length)];
        const dadosAnimal = gerarDadosAnimal(raca, idTutor);
        const res = http.post(`${BASE_URL}/animais`, JSON.stringify(dadosAnimal), params);

        if (res.status !== 201) {
            console.error(`Falha ao cadastrar animal ${i + 1}: ${res.status} ${res.body}`);
        }
    }
    console.log('Cadastro de animais concluído.');
}
