class Task {
  constructor({ id, title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = "TODO";
    this.createdAt = new Date();
  }
}

module.exports = Task;