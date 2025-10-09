const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const context = require('./context');

async function createApolloApp() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // expose the server instance for tests if needed
  app.locals.apolloServer = server;

  return app;
}

module.exports = createApolloApp;
