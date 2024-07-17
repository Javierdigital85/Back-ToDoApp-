const path = require("path");
const userSchemaDefinition = require("./src/swagger/userSwaggerDefinitions");
const taskSchemaDefinition = require("./src/swagger/taskSwaggerDefinitions");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      schemas: {
        User: userSchemaDefinition,
        Task: taskSchemaDefinition,
      },
    },
  },
  apis: [`${path.join(__dirname, "src/routes/*.js")}`],
};

module.exports = swaggerOptions;
