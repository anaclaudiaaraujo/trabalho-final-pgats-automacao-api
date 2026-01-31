import { Faker } from 'k6/x/faker';
import { SharedArray } from 'k6/data';

export const racas = new SharedArray('racas', function () {
    return JSON.parse(open('../data/racas.json'));
});

const faker = new Faker();

/**
 * Gera dados de recepcionista
 * @returns {Object} 
 */
export function gerarDadosRecepcionista() {
    try {
        const email = `recep_${faker.internet.username()}@test.com`;
        const password = faker.internet.password();
        return { email, password };
    } catch (e) {
        console.log('Erro em gerarDadosRecepcionista:', e.message);
        throw e;
    }
}

/**
 * Gera dados de tutor
 * @returns {Object} 
 */
export function gerarDadosTutor() {
    try {
        const nome = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const email = `tutor_${faker.internet.username()}@tutor.com`;
        const telefone = faker.phone ? faker.phone() : '00000000';
        return { nome, email, telefone };
    } catch (e) {
        console.log('Erro em gerarDadosTutor:', e.message);
        throw e;
    }
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
        dataNascimento: faker.time.date(),
        tutorId: idTutor
    };
}