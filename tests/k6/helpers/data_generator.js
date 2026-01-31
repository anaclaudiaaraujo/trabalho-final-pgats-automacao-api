import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker@8.3.1/+esm';
import { SharedArray } from 'k6/data';

export const racas = new SharedArray('racas', function () {
    return JSON.parse(open('../data/racas.json'));
});

/**
 * Gera dados de recepcionista
 * @returns {Object} 
 */
export function gerarDadosRecepcionista() {
    return {
        email: `recep_${faker.internet.userName()}@test.com`,
        password: faker.internet.password()
    };
}

/**
 * Gera dados de tutor
 * @returns {Object} 
 */
export function gerarDadosTutor() {
    return {
        nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: `tutor_${faker.internet.userName()}@tutor.com`,
        telefone: faker.phone.number()
    };
}

/**
 * Gera dados de animal
 * @param {Object} racaObj 
 * @param {number} idTutor 
 * @returns {Object} 
 */
export function gerarDadosAnimal(racaObj, idTutor) {
    return {
        nome: faker.person.firstName(),
        especie: racaObj.especie,
        raca: racaObj.raca,
        dataNascimento: faker.date.past().toISOString(),
        tutorId: idTutor
    };
}
