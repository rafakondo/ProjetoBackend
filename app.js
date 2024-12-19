const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_doc.json');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/rents', rentalRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => {
  console.log(`Servidor ouvindo a porta 3000`);
});

