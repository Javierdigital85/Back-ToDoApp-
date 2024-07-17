const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/crear", taskController.crear);
router.get("/obtener", taskController.obtener);
router.get("/obtener-single/:idTask", taskController.obtenerSingle);
router.put("/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

/**
 * @swagger
 * /api/tasks/crear:
 *   post:
 *     summary: create a task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *        201:
 *          description: new task created!
 */

/**
 * @swagger
 * /api/tasks/obtener:
 *   get:
 *     summary: obtain all tasks
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Id of the user filtered by
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                      type: string
 *                   description:
 *                     type: string
 *                   userId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/tasks/obtener-single/{idTask}:
 *   get:
 *     summary: Get a single task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the task id
 *     responses:
 *       200:
 *         description: a task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Buy groceries"
 *                 description:
 *                   type: string
 *                   example: "Milk, Bread, Eggs"
 *                 userId:
 *                   type: integer
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updateAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "La tarea no existe"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 *
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *    summary: Update a task by ID.
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: The ID to update the task
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: new task title
 *                example: "music"
 *              description:
 *                type: string
 *                description: new task description
 *                example: "keep learning new songs and play the bass oh darling!"
 *    responses:
 *      200:
 *        description: Task updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: updated task ID
 *                  example: 1
 *                title:
 *                  type: string
 *                  description: Update title's task
 *                  example: New task
 *                description:
 *                  type: string
 *                  description: updated task's description.
 *                  example: new updated task's description
 */

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *  delete:
 *   summary: delete a task
 *   tags: [Task]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: the task id
 *   responses:
 *     204:
 *       description: You have deleted a task!
 *     404:
 *       description: No se ha podido eliminar la tarea
 */

module.exports = router;
