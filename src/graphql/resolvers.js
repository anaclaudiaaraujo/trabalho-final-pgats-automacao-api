const TutorService = require('../common/services/tutorService');
const AnimalService = require('../common/services/animalService');
const ProntuarioService = require('../common/services/prontuarioService');
const AuthService = require('../common/services/authService');

const resolvers = {
  Query: {
    tutors: () => TutorService.getAll(),
    tutor: (_, { id }) => TutorService.getById(id),

    animals: () => AnimalService.getAll(),
    animal: (_, { id }) => AnimalService.getById(id),

    prontuarios: () => ProntuarioService.getAll(),
    prontuario: (_, { id }) => ProntuarioService.getById(id),
  },

  Mutation: {
    createTutor: (_, { input }) => TutorService.create(input),
    updateTutor: (_, { id, input }) => TutorService.update(id, input),
    deleteTutor: (_, { id }) => TutorService.remove(id),

    createAnimal: (_, { input }) => AnimalService.create(input),
    updateAnimal: (_, { id, input }) => AnimalService.update(id, input),
    deleteAnimal: (_, { id }) => AnimalService.remove(id),

    createProntuario: (_, { input }) => ProntuarioService.create(input),
    updateProntuario: (_, { id, input }) => ProntuarioService.update(id, input),
    deleteProntuario: (_, { id }) => ProntuarioService.remove(id),

    register: async (_, { input }) => await AuthService.register(input),
    login: async (_, { credentials }) => {
      const token = await AuthService.login(credentials);
      return { token };
    },
  },

  Animal: {
    tutor: (parent) => TutorService.getById(parent.tutorId),
  },

  Prontuario: {
    animal: (parent) => AnimalService.getById(parent.animalId),
  },
};

module.exports = resolvers;
