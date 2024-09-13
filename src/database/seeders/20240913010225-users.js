"use strict";

const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(8);
  return await bcrypt.hash(password, salt);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await hashPassword("javier");
    const hashedPassword2 = await hashPassword("gondor");
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Javier",
        profesion: "Software Developer",
        password: hashedPassword1,
        email: "javiercolodro@gmail.com",
        country: "Argentina",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Gandalf",
        profesion: "Mage",
        password: hashedPassword2,
        email: "gandalf@gmail.com",
        country: "Middle Earth",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
