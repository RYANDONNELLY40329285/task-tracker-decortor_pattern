const crypto = require("crypto");
const Task = require("../models/task");

const tasks = [];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

function createTask(data) {
  if (!data.title) {
    throw new Error("Title is required");
  }


  const task = new Task({
  id: crypto.randomUUID(),
  title: data.title,
  description: data.description || ""
});

  tasks.push(task);
  return task;
}

function updateTaskStatus(id, status) {
  const task = getTaskById(id);
  if (!task) return null;

  const allowedStatuses = ["TODO", "IN_PROGRESS", "DONE"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  task.status = status;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask
};
