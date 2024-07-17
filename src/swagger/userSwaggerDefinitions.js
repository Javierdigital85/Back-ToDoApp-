// swaggerDefinitions.js

const userSchemaDefinition = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The user name",
    },
    email: {
      type: "string",
      description: "The user email",
    },
    country: {
      type: "string",
      description: "The user country",
    },
    password: {
      type: "string",
      description: "The user password",
    },
    profesion: {
      type: "string",
      description: "The user profession",
    },
  },
  required: ["name", "email", "country", "password", "profesion"],
  example: {
    name: "Martin Palermo",
    email: "palermo@gmail.com",
    country: "Argentina",
    password: "aguanteboca",
    profesion: "futbolista",
  },
};

module.exports = userSchemaDefinition;
