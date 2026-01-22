class TaskServiceDecorator {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  getTaskById(id) {
    return this.taskService.getTaskById(id);
  }

  createTask(data) {
    return this.taskService.createTask(data);
  }

  updateTaskStatus(id, status) {
    return this.taskService.updateTaskStatus(id, status);
  }

  deleteTask(id) {
    return this.taskService.deleteTask(id);
  }
}

module.exports = TaskServiceDecorator;
