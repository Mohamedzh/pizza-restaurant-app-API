import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Pizza restaurant API',
        description: 'API for the pizza restaurant app',
    },
    host: process.env.HOST_URL || 'localhost:5000',
    schemes: ['http', 'https']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc);

