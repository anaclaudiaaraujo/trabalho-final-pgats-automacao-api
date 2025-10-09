const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const AuthService = {
  register: async function (userData) {
    const exists = UserModel.users.some(u => u.email === userData.email);
    if (exists) {
      throw new Error('Email já cadastrado');
    }
    const hashed = await bcrypt.hash(userData.password, 8);
    const novo = { id: UserModel.idCounter++, email: userData.email, password: hashed, role: userData.role || 'recepcionista' };
    UserModel.users.push(novo);
    const { password, ...rest } = novo;
    return rest;
  },
  login: async function (credentials) {
    const user = UserModel.users.find(u => u.email === credentials.email);
    if (!user) throw new Error('Usuário não encontrado');
    const match = await bcrypt.compare(credentials.password, user.password);
    if (!match) throw new Error('Senha inválida');
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    return token;
  }
};

module.exports = AuthService;
