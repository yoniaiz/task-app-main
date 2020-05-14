//  @desc Update user
// @route PATCH /users/me
exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowdUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowdUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid updates" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
