const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");

const {
  configDatabase,
  testUser,
  testUserId,
  taskOne,
  taskTwo,
  taskThree,
  testUser2,
  testUser2Id,
} = require("./fixtures/db");

beforeEach(configDatabase);

test("should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      title:"title",
      description: "From test",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.description).toBe("From test");
  expect(task.completed).toBe(false);
});

test("should get user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("should not delete other users tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${testUser2.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull()
});
