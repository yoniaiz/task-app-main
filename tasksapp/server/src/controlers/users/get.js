const User = require("../../models/user");

//  @desc Get authorized user details
// @route GET /users/me
exports.getMe = async (req, res, next) => {
  try {
    await req.user
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

    const token = await req.user.generateAuthToken();
    res.send({ user: req.user, tasks: req.user.tasks, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

//  @desc Get authorized user details
// @route GET /users/:id
exports.getUserById = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    await user
      .populate({
        path: "tasks",
      })
      .execPopulate();

    const sendUser = {
      name: user.name,
      age: user.age,
      _id: user._id,
      email: user.email,
      tasks: user.tasks.length,
    };

    res.send({ ...sendUser });
  } catch {
    (error) => {
      res.status(500).send(error);
    };
  }
};

//  @desc Get user avatar image
// @route GET /users/:id/avatar
exports.getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) throw new Error();

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
};
