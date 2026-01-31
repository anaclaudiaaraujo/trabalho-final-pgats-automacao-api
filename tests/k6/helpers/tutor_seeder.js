import http from 'k6/http';
import { gerarDadosTutor } from './data_generator.js';
import { BASE_URL } from '../config/constants.js';
import { obterHeaders } from './auth.js';

/**
 * Cria um tutor e retorna seu ID
 * @param {string} token 
 * @returns {number} 
 */
export function criarTutor(token) {
    const params = obterHeaders(token);

    const dadosTutor = gerarDadosTutor();
    const tutorRes = http.post(`${BASE_URL}/tutores`, JSON.stringify(dadosTutor), params);

    let idTutor;
    try {
        const body = tutorRes.json();
        idTutor = body.id;
    } catch (e) {
        console.error('Falha ao processar resposta do tutor', e);
    }

    if (!idTutor) {
        throw new Error(`Falha ao criar tutor no setup. Status: ${tutorRes.status}`);
    }

    return idTutor;
}
