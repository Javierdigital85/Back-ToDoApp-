"use strict";

const { User } = require("../../models");

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      User.findOrCreate({
        where: {
          id: "1",
        },
        defaults: {
          name: "Javier",
          profesion: "Software Developer",
          age: 38,
          password: "asdf",
          email: "javiercolodro@gmail.com",
          country: "Argentina",
        },
      }),
      User.findOrCreate({
        where: {
          id: "2",
        },
        defaults: {
          name: "NODE",
          profesion: "Coder",
          age: 43,
          password: "asdf",
          email: "pruebaUno@prueba.com",
          country: "Dinamarca",
        },
      }),
      User.findOrCreate({
        where: {
          id: "3",
        },
        defaults: {
          name: "React",
          profesion: "Coder",
          age: 43,
          password: "asdf",
          email: "pruebaDos@prueba.com",
          country: "Japon",
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
