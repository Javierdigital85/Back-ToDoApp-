//ESTE ARCHIVO SIRVE PARA LOS ARCHIVOS
const User = require("./User");
const Task = require("./Task");

//Ddefinicion de las relaciones entre modelos
//User.hasMany(Task, { as: "tasks" }); //Un usuario puede tener muchas tareas
Task.belongsTo(User, { as: "user" }); //Una tarea pertenece a un usuario

module.exports = { User, Task };
