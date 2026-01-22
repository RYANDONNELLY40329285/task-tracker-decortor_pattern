const express = require("express");
const controller = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", controller.getTasks);
router.get("/tasks/:id", controller.getTask);
router.post("/tasks", controller.createTask);
router.put("/tasks/:id", controller.updateTask);
router.delete("/tasks/:id", controller.deleteTask);

module.exports = router;
