const errors = require("../const/errors");
const { Task } = require("../database/models");

module.exports = {
  crear: async (req, res, next) => {
    try {
      // const { title, description } = req.body;
      const task = await Task.create(req.body);
      return res.status(201).send(task);
    } catch (error) {
      return next(errors.tareaCreada);
    }
  },

  obtener: async (req, res, next) => {
    try {
      const { userId } = req.query; //obtengo por clave y valor lo que envia el front por parametro de consulta
      let tasks;
      if (userId) {
        tasks = await Task.findAll({ where: { userId: userId } });
      } else {
        tasks = await Task.findAll();
      }
      res.status(200).send(tasks);
    } catch (error) {
      return next(errors.tareaInexistente);
    }
  },

  obtenerSingle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskId = await Task.findByPk(Number(id));
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
        res.status(200).send(task[0]);
      }
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    try {
      if (!task) return next(errors.taskDelete.message);
      await Task.destroy({ where: { id: id } });
      console.log(id);
      res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  },
};
