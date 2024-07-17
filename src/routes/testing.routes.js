const express = require("express");
const router = express.Router();
const testController = require("../controllers/testing.controller");

router.post("/reset", testController.test);

module.exports = router;
