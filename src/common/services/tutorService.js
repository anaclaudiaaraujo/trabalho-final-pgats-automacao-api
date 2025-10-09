const TutorModel = require('../models/tutorModel');

const TutorService = {
  getAll() {
    return TutorModel.tutores;
  },
  getById(id) {
    return TutorModel.tutores.find(t => t.id === id) || null;
  },
  create(data) {
    const novo = { id: TutorModel.idCounter++, ...data };
    TutorModel.tutores.push(novo);
    return novo;
  },
  update(id, data) {
    const indice = TutorModel.tutores.findIndex(t => t.id === id);
    if (indice === -1) return null;
    TutorModel.tutores[indice] = { ...TutorModel.tutores[indice], ...data };
    return TutorModel.tutores[indice];
  },
  remove(id) {
    const indice = TutorModel.tutores.findIndex(t => t.id === id);
    if (indice === -1) return false;
    TutorModel.tutores.splice(indice, 1);
    return true;
  }
};

module.exports = TutorService;
