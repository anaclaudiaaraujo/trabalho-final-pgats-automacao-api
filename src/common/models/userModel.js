const bcrypt = require('bcryptjs');

const model = {
  users: [
    {
      id: 1,
      email: 'admin@clinicavet.local',
      password: bcrypt.hashSync('tesT123', 8),
      role: 'administrador'
    },
    {
      id: 2,
      email: 'recepcao@clinicavet.local',
      password: bcrypt.hashSync('tesT123', 8),
      role: 'recepcionista'
    }
  ],
  idCounter: 1,
};

const createInitialAdmin = () => {
  const email = 'admin@clinicavet.local';
  const plain = 'admin123';
  const hashed = bcrypt.hashSync(plain, 8);
  model.users.push({ id: model.idCounter++, email, password: hashed, role: 'veterinario' });
};

createInitialAdmin();

module.exports = model;
