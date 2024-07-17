const errors = require("../const/errors");
const { Task } = require("../database/models");

module.exports = {
  createTask: async (task) => {
    return await Task.create(task);
  },

  singleTask: async (userId) => {
    try {
      return await Task.findAll({ where: { userId: userId } });
    } catch (error) {
      throw error("error");
    }
  },
  allTasks: async () => {
    try {
      return await Task.findAll();
    } catch (error) {
      throw error("error");
    }
  },

  oneTask: async (taskId) => {
    try {
      const task = await Task.findByPk(Number(taskId));
      if (!task) {
        return null;
      }
      return task;
    } catch (error) {
      throw new Error("error", error);
    }
  },
};
