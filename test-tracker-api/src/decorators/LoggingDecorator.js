const TaskServiceDecorator = require("./TaskServiceDecorator");

class LoggingDecorator extends TaskServiceDecorator {
  createTask(data) {
    console.log(`[LOG] Creating task: ${data.title}`);
    return super.createTask(data);
  }

  deleteTask(id) {
    console.log(`[LOG] Deleting task: ${id}`);
    return super.deleteTask(id);
  }
}

module.exports = LoggingDecorator;
