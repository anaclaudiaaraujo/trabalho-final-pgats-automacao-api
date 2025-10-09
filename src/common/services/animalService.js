const AnimalModel = require('../models/animalModel');
const TutorModel = require('../models/tutorModel');

const AnimalService = {
  getAll() {
    return AnimalModel.animais;
  },
  getById(id) {
    return AnimalModel.animais.find(a => a.id === id) || null;
  },
  create(data) {
    const tutorExists = TutorModel.tutores.some(t => t.id === data.tutorId);
    if (!tutorExists) {
      throw new Error('Tutor não encontrado');
    }
    const novo = { id: AnimalModel.idCounter++, ...data };
    AnimalModel.animais.push(novo);
    return novo;
  },
  update(id, data) {
    const indice = AnimalModel.animais.findIndex(a => a.id === id);
    if (indice === -1) return null;
    AnimalModel.animais[indice] = { ...AnimalModel.animais[indice], ...data };
    return AnimalModel.animais[indice];
  },
  remove(id) {
    const indice = AnimalModel.animais.findIndex(a => a.id === id);
    if (indice === -1) return false;
    AnimalModel.animais.splice(indice, 1);
    return true;
  }
};

module.exports = AnimalService;
