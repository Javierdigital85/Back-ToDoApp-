const errors = require("../const/errors");
const { Task } = require("../database/models");
const taskServices = require("../services/tasks.services");

module.exports = {
  crear: async (req, res, next) => {
    try {
      const task = await taskServices.createTask(req.body);
      return res.status(201).send(task);
    } catch (error) {
      return next(errors.tareaCreada);
    }
  },

  obtener: async (req, res, next) => {
    try {
      const { userId } = req.query; //obtengo por clave y valor lo que envia el front por parametro de consulta
      console.log(userId, "esto vale userId");
      let tasks;
      if (userId) {
        tasks = await taskServices.singleTask(userId);
      } else {
        tasks = await taskServices.allTasks();
      }
      return res.status(200).send(tasks);
    } catch (error) {
      return next(errors.tareaInexistente.code);
    }
  },
  //Task.findByPk(Number(id));
  obtenerSingle: async (req, res, next) => {
    try {
      const { idTask } = req.params;
      const taskId = await taskServices.oneTask(idTask);
      if (!taskId) {
        throw errors.tareaInexistente;
      }
      return res.send(taskId);
    } catch (error) {
      return next(error);
    }
  },
  updateTask: async (req, res, next) => {
    const { id } = req.params; //Le decis que tarea actualizar
    const { title, description } = req.body; //Lo que vas a actualizar de esa tarea
    try {
      const [rows, task] = await Task.update(
        {
          title,
          description,
        },
        {
          where: { id: id },
          returning: true, // Esta opción indica a Sequelize que devuelva los registros actualizados
        }
      );
      if (rows === 0) {
        return res
          .status(errors.tareaActualizada.code)
          .send(errors.tareaActualizada.message);
      } else {
        return res.status(200).send(task[0]);
      }
    } catch (error) {
      return next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    try {
      // if (!task) return next(errors.taskDelete.message);
      if (!task)
        return res
          .status(errors.taskDelete.code)
          .send(errors.taskDelete.message);
      await Task.destroy({ where: { id: id } });
      console.log(id);
      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  },
};
