import { obterToken } from './auth.js';
import { gerarDadosRecepcionista } from './data_generator.js';

/**
 * Gera dados de recepcionista e retorna um token de autenticação para o recepcionista gerado
 * @returns {string} 
 */
export function obterTokenRecepcionista() {
    const userCredentials = gerarDadosRecepcionista();
    return obterToken(userCredentials.email, userCredentials.password, 'recepcionista');
}

/**
 * Gera um pool de tokens de recepcionista conforme a quantidade informada para os casos em que há necessidade de múltiplos tokens
 * @param {number} quantidade 
 * @returns {Array<string>} 
 */
export function obterPoolDeTokensRecepcionista(quantidade = 10) {
    const tokens = [];
    console.log(`Gerando pool de ${quantidade} tokens de recepcionista...`);

    for (let i = 0; i < quantidade; i++) {
        tokens.push(obterTokenRecepcionista());
    }

    console.log('Pool de tokens gerado com sucesso.');
    return tokens;
}