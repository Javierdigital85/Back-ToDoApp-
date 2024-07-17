const { User, Task } = require("../database/models");

module.exports = {
  test: async (req, res) => {
    try {
      // Eliminar todas las tareas (si Task tiene relaciones, asegúrate de configurar correctamente)
      await Task.destroy({ where: {} });

      // Eliminar todos los usuarios
      await User.destroy({ where: {} });

      // Respondemos con un estado 204 (No Content) cuando todo está bien
      res.status(204).end();
    } catch (error) {
      console.error("Error al intentar resetear la base de datos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
