//RUTAS DE LOS USUARIOS
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const { validateUser } = require("../middleware/auth");
const validate = require("../middleware/validate");
const usuarioSchema = require("../middleware/schemes/usuario.scheme");

router.post(
  "/register",
  validate(usuarioSchema.register),
  usuarioController.register
);
router.post("/login", usuarioController.login);
router.post("/logout", usuarioController.logout);
router.get("/me", validateUser, usuarioController.me);
router.get("/todos", usuarioController.todos);
router.get("/usuario/:userId", usuarioController.listarInfo);
router.delete("/usuario/:userId", usuarioController.eliminar);
router.put("/forgotpassword", usuarioController.forgotPassword);
router.get(
  "/usuario/validate-token/:token",
  usuarioController.validateTokenRestorePassword
);
router.post("/overwrite-password/:token", usuarioController.overWritePassword);
router.put("/changepassword/:id", usuarioController.changePassword);

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: new user created!
 *       400:
 *         description : El usuario ya existe
 *       404:
 *         description : Ha ocurrido un error al registrarte
 */
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "palermo@gmail.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "aguanteboca"
 *     responses:
 *       200:
 *         description: login successfully!
 *       404:
 *         description: User does not exist in put database
 *       422:
 *         description: Error de validacion
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/usuarios/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [User]
 *     responses:
 *       204:
 *         description: Logout succesfull
 */

/**
 * @swagger
 * /api/usuarios/me:
 *   get:
 *     summary: Obtener la información del usuario autenticado
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: "Martin Palermo"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "palermo@gmail.com"
 *                 country:
 *                   type: string
 *                   description: País del usuario
 *                   example: "Argentina"
 */

/**
 * @swagger
 * /api/usuarios/todos:
 *   get:
 *     summary: return users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: all users!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/usuarios/usuario/{id}:
 *  get:
 *    summary: return a  user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *        400:
 *          description: User does not exist in our data base
 */

/**
 * @swagger
 * /api/usuarios/usuario/{id}:
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      202:
 *        description: user deleted
 *      400:
 *        description: user not found
 *      500:
 *        description: Server error
 */

/**
 * @swagger
 * /api/usuarios/forgotpassword:
 *  put:
 *    summary: recover password
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                type: string
 *                example: javiercolodro@gmail.com
 *    responses:
 *      200:
 *        description: Email sent successfully
 *      400:
 *        description: Email is required
 *      401:
 *        description: User not found
 *      500:
 *        description: Internal error
 */

/**
 * @swagger
 * /api/usuarios/usuario/validate-token/{token}:
 *  get:
 *    summary: Validate token for password restore
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *        decription: Token to validate
 *    responses:
 *      200:
 *        description: Token is valid
 *        content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              country:
 *                type: string
 *              profesion:
 *                type: string
 *      401:
 *        description: Unauthorized or token is invalid
 *      500:
 *        description: Internal Server Error
 */

module.exports = router;
