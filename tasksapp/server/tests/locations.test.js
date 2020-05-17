const request = require("supertest");
const Location = require("../src/models/Location");
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

test("Should get locations", async () => {
  const response = await request(app)
    .get("/tasks/location/all")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.success).toBe(true);
  expect(response.body.count).toBe(0);
});

test("Should add Location", async () => {
  const response = await request(app)
    .post(`/tasks/location/${taskOne._id}`)
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      locationId: "0002",
      address: "karmiel, tishrei 5",
    })
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(String(response.body.data.task)).toBe(String(taskOne._id));
});

test("Should not add Location", async () => {
  const response = await request(app)
    .post(`/tasks/location/${taskOne._id}`)
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      locationId: "0002",
      address: "",
    })
    .expect(500);
});
