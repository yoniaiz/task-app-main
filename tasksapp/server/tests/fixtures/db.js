const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const Location = require("../../src/models/Location");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const userCreator = () => {
  const id = new mongoose.Types.ObjectId();
  const user = {
    _id: id,
    name: `testUser${makeid(10)}`,
    email: `email${makeid(10)}@gmail.com`,
    password: "Aa123456",
    age: 31,
    tokens: [
      {
        token: jwt.sign({ _id: id }, process.env.JWT_SECRET),
      },
    ],
  };
  return [user, id];
};

const taskCreator = (owner, completed = false) => {
  return {
    _id: new mongoose.Types.ObjectId(),
    title: `title ${makeid(8)}`,
    description: `task ${makeid(8)}`,
    completed,
    owner,
  };
};

const [testUser, testUserId] = userCreator();
const [testUser2, testUser2Id] = userCreator();

const taskOne = taskCreator(testUserId);
const taskTwo = taskCreator(testUser2Id, true);
const taskThree = taskCreator(testUserId);

const configDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await Location.deleteMany();
  await new User(testUser).save();
  await new User(testUser2).save();
  await new Task(taskOne).save();
  await new Task(taskThree).save();
  await new Task(taskTwo).save();
};

module.exports = {
  testUserId,
  testUser,
  configDatabase,
  testUser2Id,
  testUser2,
  taskOne,
  taskTwo,
  taskThree,
};
