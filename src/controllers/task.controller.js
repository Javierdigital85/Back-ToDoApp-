const errors = require("../const/errors");

const { Task } = require("../models");

module.exports = {
  crear: async (req, res, next) => {
    try {
      // const { title, description } = req.body;
      const task = await Task.create(req.body);
      res.send(task);
    } catch (error) {
      return next(errors.tareaCreada);
    }
  },

  // crear: async (req, res, next) => {
  //   try {
  //     const { userId, title, description } = req.body; // Asegúrate de que req.body contenga el userId
  //     const task = await Task.create({ userId, title, description }); // Crea la tarea con los datos proporcionados en el cuerpo de la solicitud
  //     const taskId = task.id;

  //     await task.update({ taskId });
  //     res.send(task);
  //   } catch (error) {
  //     return next(errors.tareaCreada);
  //   }
  // },

  obtener: async (req, res, next) => {
    try {
      const { userId } = req.query; //obtengo por clave y valor lo que envia el front
      let tasks;
      if (userId) {
        tasks = await Task.findAll({ where: { userId: userId } });
      } else {
        tasks = await Task.findAll();
      }
      res.send(tasks);
    } catch (error) {
      return next(error);
    }
  },
  obtenerSingle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskId = await Task.findByPk(id);
      if (!taskId) return next(errors.tareaInexistente);
      res.send(taskId);
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
        res
          .status(errors.tareaActualizada.code)
          .send(errors.tareaActualizada.message);
      } else {
        res.status(200).send(task);
      }
    } catch (error) {
      return next(error);
    }
  },
  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    try {
      if (!task) return next(errors.tareaEliminada);
      await Task.destroy({ where: { id: id } });
      console.log(id);
      res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  },
};
