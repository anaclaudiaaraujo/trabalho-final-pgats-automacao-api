const model = {
  animais: [
    {
      id: 1,
      nome: "Thor",
      especie: "Gato",
      raca: "SRD",
      dataNascimento: "01/03/2022",
      tutorId: 1
    },
    {
      id: 2,
      nome: "Alfredo",
      especie: "Gato",
      raca: "SRD",
      dataNascimento: "01/12/2018",
      tutorId: 1
    }
  ],
};

// garantir que o idCounter comece em um valor maior que qualquer id existente
model.idCounter = model.animais && model.animais.length
  ? Math.max(...model.animais.map(a => a.id)) + 1
  : 1;

module.exports = model;
