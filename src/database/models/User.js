const Sequelize = require("sequelize");
const db = require("../../db");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // picture: {
    //   type: Sequelize.STRING,
    // },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profesion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    oldPassword: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    salt: {
      type: Sequelize.STRING,
    },

    getDomainEmail: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.email.substring(this.email.lastIndexOf("@") + 1);
      },
    },
    // deletedAt: {
    //   type: Sequelize.DATE,
    //   field: "deleted_at",
    // },
  },
  {
    // paranoid: true,
    sequelize: db, //coneciona  la base de datos
    modelName: "user", //el nombre del modelo
  }
); //en el primer objeto ponemos las propiedades en el segundo a la coneccion a la base de datos

User.addHook("beforeCreate", (user) => {
  console.log("ME ESTOY CREANDO " + user.name);
});

//METODO DE CLASE Esto funciona como el metodo de findAll
User.getEmployees = function () {
  this.findAll({ where: { getDomianEmail: "gmail.com" } });
};

//METODO DE INSTANCIA
User.prototype.saludar = function () {
  return "My name is  " + this.name;
};

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;

/*
salt: El salt utilizado para cifrar la contraseña del usuario. El salt es una cadena aleatoria única que se agrega a la contraseña antes de cifrarla para hacer más difícil su descifrado mediante ataques de fuerza bruta.
*/
