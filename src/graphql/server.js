require('dotenv').config();
const createApolloApp = require('./app');

const PORT = process.env.GRAPHQL_PORT || 4000;

(async () => {
  const app = await createApolloApp();
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL executando em http://localhost:${PORT}/graphql`);
  });
})();
