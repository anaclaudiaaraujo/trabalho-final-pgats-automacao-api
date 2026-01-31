import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config/constants.js';

/**
 * Gera um token de autenticação para o usuário
 * @param {string} email 
 * @param {string} password 
 * @param {string} role 
 * @returns {string} 
 */
export function obterToken(email, password, role) {
    const payloadRegister = JSON.stringify({
        email: email,
        password: password,
        role: role
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(`${BASE_URL}/auth/register`, payloadRegister, params);

    const payloadLogin = JSON.stringify({
        email: email,
        password: password
    });

    const res = http.post(`${BASE_URL}/auth/login`, payloadLogin, params);

    check(res, {
        'Login realizado com sucesso': (r) => r.status === 200,
        'Token recebido': (r) => r.json('token') !== undefined
    });

    return res.json('token');
}

/**
 * Centraliza a geração de headers para as requisições
 * @param {string} token 
 * @returns {Object} 
 */
export function obterHeaders(token) {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
}