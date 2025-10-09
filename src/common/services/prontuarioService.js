const ProntuarioModel = require('../models/prontuarioModel');
const AnimalModel = require('../models/animalModel');

const ProntuarioService = {
  // alias usado pela camada GraphQL: list() -> getAll()
  list() {
    return ProntuarioModel.prontuarios;
  },
  getAll() {
    return ProntuarioModel.prontuarios;
  },
  getById(id) {
    return ProntuarioModel.prontuarios.find(p => p.id === id) || null;
  },
  create(data) {
    const animalExists = AnimalModel.animais.some(a => a.id === data.animalId);
    if (!animalExists) {
      throw new Error('Animal não encontrado');
    }
    const novo = { id: ProntuarioModel.idCounter++, ...data };
    ProntuarioModel.prontuarios.push(novo);
    return novo;
  },
  update(id, data) {
    const indice = ProntuarioModel.prontuarios.findIndex(p => p.id === id);
    if (indice === -1) return null;
    ProntuarioModel.prontuarios[indice] = { ...ProntuarioModel.prontuarios[indice], ...data };
    return ProntuarioModel.prontuarios[indice];
  },
  remove(id) {
    const indice = ProntuarioModel.prontuarios.findIndex(p => p.id === id);
    if (indice === -1) return false;
    ProntuarioModel.prontuarios.splice(indice, 1);
    return true;
  }
};

module.exports = ProntuarioService;
