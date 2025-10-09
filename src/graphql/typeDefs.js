const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tutor {
    id: Int
    nome: String
    email: String
    telefone: String
  }

  input TutorInput {
    nome: String
    email: String
    telefone: String
  }

  type Animal {
    id: Int
    nome: String
    especie: String
    raca: String
    dataNascimento: String
    tutorId: Int
    tutor: Tutor
  }

  input AnimalInput {
    nome: String
    especie: String
    raca: String
    dataNascimento: String
    tutorId: Int
  }

  type Prontuario {
    id: Int
    dataAtendimento: String
    descricao: String
    tratamento: String
    exames: String
    animalId: Int
    animal: Animal
  }

  input ProntuarioInput {
    dataAtendimento: String
    descricao: String
    tratamento: String
    exames: String
    animalId: Int
  }

  type User {
    id: Int
    email: String
    role: String
  }

  input RegisterInput {
    email: String!
    password: String!
    role: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
  }

  type Query {
    tutors: [Tutor]
    tutor(id: Int!): Tutor

    animals: [Animal]
    animal(id: Int!): Animal

    prontuarios: [Prontuario]
    prontuario(id: Int!): Prontuario
  }

  type Mutation {
    createTutor(input: TutorInput): Tutor
    updateTutor(id: Int!, input: TutorInput): Tutor
    deleteTutor(id: Int!): Boolean

    createAnimal(input: AnimalInput): Animal
    updateAnimal(id: Int!, input: AnimalInput): Animal
    deleteAnimal(id: Int!): Boolean

    createProntuario(input: ProntuarioInput): Prontuario
    updateProntuario(id: Int!, input: ProntuarioInput): Prontuario
    deleteProntuario(id: Int!): Boolean

    register(input: RegisterInput): User
    login(credentials: LoginInput): AuthPayload
  }
`;

module.exports = typeDefs;
