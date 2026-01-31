const AuthService = require('../../common/services/authService');

const register = async (req, res) => {
  try {
    const created = await AuthService.register(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };