const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const { configDatabase, testUser, testUserId } = require("./fixtures/db");

beforeEach(configDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "yoni",
      email: "test@test.com",
      password: "Aa123456",
      age: 31,
    })
    .expect(201);

  // assert usr has been saved succesfuly to database
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: "yoni",
      email: "test@test.com",
      age: 31,
    },
    token: user.tokens[0].token,
  });

  // assert password has been hashed
  expect(user.password).not.toBe("Aa123456");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(user.tokens[1].token).toBe(response.body.token);
});

test("should not login not existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: testUser.email,
      password: "testUser.password",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer 123213123`)
    .send()
    .expect(401);
});

test("should delete profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(testUserId);
  expect(user).toBeNull();
});

test("should not delete unauthorized profile for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer 123213123`)
    .send()
    .expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(testUserId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid users name", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      name: "yoni",
    })
    .expect(200);

  const user = await User.findById(testUser._id);
  expect(user.name).toBe("yoni");
});

test("should update invalid users fields", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      name: "yoni",
      gender: "dana internesional",
    })
    .expect(400);
});
