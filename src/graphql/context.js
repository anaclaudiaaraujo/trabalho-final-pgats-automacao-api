const AuthService = require('../common/services/authService');

const context = async ({ req }) => {
  // pass along headers for potential auth checks; can expand later
  const auth = req && req.headers ? req.headers.authorization : null;
  return { auth, services: { AuthService } };
};

module.exports = context;
