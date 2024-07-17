const taskSchemaDefinition = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "the user's task",
    },
    description: {
      type: "string",
      description: "the users's description activity",
    },
  },
  required: ["title", "description"],
  example: {
    title: "Music",
    description: "rehearsal on saturday",
  },
};

module.exports = taskSchemaDefinition;
