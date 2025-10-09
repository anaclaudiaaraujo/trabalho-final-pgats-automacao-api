const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Veterinária - Prontuários',
      version: '1.0.0',
      description: 'API REST para gestão de prontuários de animais de estimação',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Servidor local com prefixo /api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/rest/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
