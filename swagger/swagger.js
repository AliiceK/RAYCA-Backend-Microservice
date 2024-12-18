const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Customer Support Ticket API",
            version: "1.0.0",
            description: "API documentation for managing customer support tickets",
            contact: {
                name: "Your Name",
                email: "yourname@example.com",
            },
        },
        servers: [
            { url: "http://localhost:3000", description: "Local Server" },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger docs available at http://localhost:3000/api-docs");
};

module.exports = setupSwagger;
