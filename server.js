const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(cors());
app.use(express.json());


// SWAGGER
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
      description: 'An Api to handle the recipes',
    },
    servers: [
      {
        url: 'http://localhost:4000/api', // Change the URL if needed
      },
    ],
  },
  // Path to the files where you define your endpoints.
  apis: ['./routes.js'], // Update the path accordingly
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

var dbURI = 'mongodb+srv://ms00916:xiZNXMSHhNE2tm6Q@mostafa.jt5wjml.mongodb.net/'; // database uri


//Database connection 
const PORT = 4000;

app.use('/', routes);

mongoose.connect(dbURI)
    .then((result) => {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    }).catch((err) => console.log(err));