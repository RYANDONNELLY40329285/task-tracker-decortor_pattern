const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  it("creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });
});
