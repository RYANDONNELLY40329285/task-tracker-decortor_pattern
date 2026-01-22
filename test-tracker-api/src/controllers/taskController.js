
const taskService = require("../services/taskService");
const LoggingDecorator = require("../decorators/LoggingDecorator");
const MetricsDecorator = require("../decorators/MetricsDecorator");

const decoratedService =
  new MetricsDecorator(
    new LoggingDecorator(taskService)
  );




exports.getTasks = (req, res) => {
  res.json(decoratedService.getAllTasks());
};

exports.getTask = (req, res) => {
  const task = decoratedService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
  try {
    const task = decoratedService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = (req, res) => {
  try {
    const task = decoratedService.updateTaskStatus(
      req.params.id,
      req.body.status
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = (req, res) => {
  const success = decoratedService.deleteTask(req.params.id);
  if (!success) return res.status(404).json({ message: "Task not found" });
  res.status(204).send();
};
