const Sequelize = require("sequelize");
const db = require("../db");

class Task extends Sequelize.Model {}

Task.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "task",
  }
);

module.exports = Task;
