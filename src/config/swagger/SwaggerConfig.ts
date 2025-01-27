// const swaggerJsDoc = require("swagger-jsdoc");
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Receipt Processor API Documentation", // Title of the API
      version: "1.0.0", // Version of your API
      description: "a webservice that fulfils the documented API", // Description
    },
    servers: [
      {
        url: "http://localhost:3000", // Base URL for your API
        description: "Development server",
      },
    ],
  },
  apis: ["./src/api/v1/routers/**/*.ts"], // Path to your API documentation files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
