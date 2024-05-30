const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/obtener", taskController.obtener);
router.post("/crear", taskController.crear);
router.get("/obtener/:id", taskController.obtenerSingle);
router.put("/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;

/*

  const { email } = req.query;
  const { password } = req.body;
  User.update(
    { password },
    {
      where: { email },
      returning: true,
    }
  )
    .then(([rows, user]) => {
      res.status(201).send(user);
    })
    .catch((error) => console.log(error));
});

*/
