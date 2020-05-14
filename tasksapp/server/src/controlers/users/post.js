const User = require("../../models/user");
const { sendWelcomeEmail } = require("../../emails/account");
const sharp = require("sharp");

//  @desc Post new user
// @route POST /users
exports.addNewUser = async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user);

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//  @desc login
// @route POST /users/login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    await user
      .populate({
        path: "tasks",
        options: {
          limit: 10,
          sort: {
            updatedAt: -1,
          },
        },
      })
      .execPopulate();
    res.send({ user, token, tasks: user.tasks });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
//  @desc logout
// @route POST /users/logout
exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};
//  @desc logout
// @route POST /users/logout
exports.uploadImage = async (req, res, next) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  console.log("after buffer");
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
};
