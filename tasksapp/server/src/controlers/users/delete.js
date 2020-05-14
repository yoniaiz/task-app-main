const { cancelationEmail } = require("../../emails/account");
//  @desc delet user
// @route DELETE /users/me
exports.deleteUser = async (req, res, next) => {
  try {
    await req.user.remove();
    cancelationEmail(req.user);

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
