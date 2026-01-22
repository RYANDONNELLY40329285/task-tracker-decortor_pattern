const readline = require("readline");

const API_URL = "http://localhost:3000/api/tasks";
const VALID_STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* ---------- Helpers ---------- */

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}

function printMenu() {
  console.log("\n=== Task Tracker CLI ===");
  console.log("1. List tasks");
  console.log("2. Create task");
  console.log("3. Update task status");
  console.log("4. Delete task");
  console.log("5. Exit");
}

/* ---------- Menu ---------- */

async function menu() {
  printMenu();
  const choice = await ask("Choose an option: ");

  switch (choice) {
    case "1":
      await listTasks();
      break;
    case "2":
      await createTask();
      break;
    case "3":
      await updateTask();
      break;
    case "4":
      await deleteTask();
      break;
    case "5":
      console.log("Exiting application.");
      rl.close();
      return;
    default:
      console.log("Invalid option. Please enter a number between 1 and 5.");
  }

  menu();
}

/* ---------- Actions ---------- */
async function listTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();

    if (tasks.length === 0) {
      console.log("No tasks found.");
      return;
    }

    console.log("\nTasks:\n");

    tasks.forEach((task, index) => {
      console.log(`Task ${index + 1}`);
      console.log(`  ID:     ${task.id}`);
      console.log(`  Title:  ${task.title}`);
      console.log(`  Status: ${task.status}`);
      console.log("");
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}



async function createTask() {
  const title = await ask("Task title: ");

  if (!title) {
    console.log("Task title cannot be empty.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create task");
    }

    const task = await res.json();
    console.log(`Task created: ${task.title}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function updateTask() {
  const id = await ask("Task ID: ");

  if (!id) {
    console.log("Task ID is required.");
    return;
  }

  const status = await ask("New status (TODO / IN_PROGRESS / DONE): ");

  if (!VALID_STATUSES.includes(status)) {
    console.log("Invalid status. Allowed values: TODO, IN_PROGRESS, DONE.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (res.status === 404) {
      console.log("Task not found.");
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    console.log("Task updated successfully.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function deleteTask() {
  const id = await ask("Task ID: ");

  if (!id) {
    console.log("Task ID is required.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (res.status === 404) {
      console.log("Task not found.");
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    console.log("Task deleted successfully.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

/* ---------- Start ---------- */

menu();
