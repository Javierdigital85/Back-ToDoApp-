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

  updateTask: async (taskId, updateData) => {
    try {
      const [rows, task] = await Task.update(updateData, {
        where: { id: taskId },
        returning: true, // Esta opción indica a Sequelize que devuelva los registros actualizados
      });
      if (rows === 0) {
        return null;
      }
      return task[0];
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return null;
      }
      return task;
    } catch (error) {
      throw new Error("error");
    }
  },
  destroyTask: async (taskId) => {
    try {
      const destroyTask = await Task.destroy({ where: { id: taskId } });
      return destroyTask;
    } catch (error) {
      throw Error("error");
    }
  },
};
