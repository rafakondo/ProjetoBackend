const swaggerAutogen = require('swagger-autogen')();

output = './swagger_doc.json';
endpoints = ['./routes/userRoutes.js', './routes/carRoutes.js', './routes/rentalRoutes.js'];

const doc = {
    info: {
      version: '1.0',            // by default: '1.0.0'
      title: 'Aluguel de carros',              // by default: 'REST API'
      description: 'API REST para gerenciamento de aluguel de carros'         // by default: ''
    }
};

swaggerAutogen( output, endpoints, doc)