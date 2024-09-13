const { transporter } = require("../config/mailer");
const { generateToken } = require("../config/tokens");
const { User } = require("../database/models");

module.exports = {
  findUserByEmail: async (email) => {
    return await User.findOne({ where: { email: email } });
  },
  createUser: async (userData) => {
    return await User.create(userData);
  },

  validatePassword: async (user, password) => {
    return await user.validatePassword(password);
  },
  getUserById: async (userId) => {
    return await User.findByPk(userId);
  },

  getAllUsers: async () => {
    return await User.findAll();
  },

  deleteUser: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return null;
      }
      await User.destroy({ where: { id: userId } });
      return user;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      
      const token = generateToken(
        {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          profesion: user.profesion,
        },
        "10"
      );
      user.token = token;//asignamos el token al campo 'token' de l usuario
      await user.save();
      const restorePasswordURL = `http://localhost:5173/repeat-password/${user.token}`;

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgot password 👻" <javiercolodro@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Forgot password ✔", // Subject line
        html: `
  <b>Please click on the following link, or paste this into your browser to complete the process</b>
  <a href="${restorePasswordURL}">${restorePasswordURL}</a>
  `,
      });
      return user.email;
    } catch (error) {
      console.error("Error in forgotPassword service", error);
      throw error;
    }
  },
};
