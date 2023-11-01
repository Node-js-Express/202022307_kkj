import swaggerJsdoc  from 'swagger-jsdoc';
import swaggerUi  from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        servers: [
            {
                url:"http://localhost:3001",
            },
        ],
    },
    apis: ['./models/*.js','./controllers/*.js']
};

const specs = swaggerJsdoc(options);

export {
    swaggerUi, specs,options
}