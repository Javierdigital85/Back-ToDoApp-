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
          name: "Node",
          profesion: "Pilot",
          age: 51,
          password: "asdf",
          email: "prueba@prueba.com",
          country: "Brazil",
        },
      }),
      User.findOrCreate({
        where: {
          id: "2",
        },
        defaults: {
          name: "React",
          profesion: "Coder",
          age: 43,
          password: "asdf",
          email: "pruebaDos@prueba.com",
          country: "Argentina",
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
