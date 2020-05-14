const express = require("express");
const upload = require("../utils/multer");

const router = new express.Router();
const auth = require("../middleware/auth");

const {
  getMe,
  getUserById,
  getAvatar,
  addNewUser,
  login,
  logout,
  uploadImage,
  updateUser,
  deleteUser,
} = require("../controlers/users");

/* =========================================
   GET ALL USERS
============================================ */
const mainUrl = "/users";
router.route("/me").get(auth, getMe);

/* =========================================
   GET SINGLE USER
============================================ */

router.route(`/:id`).get(auth, getUserById);

router.route(`/:id/avatar`).get(getAvatar);

/* =========================================
   ADD NEW USER
============================================ */

router.route("").post(addNewUser);

/* =========================================
   LOGIN
============================================ */

router.route(`/login`).post(login);

/* =========================================
   LOGOUT + LOGTOUT from all accounts
============================================ */

router.route(`/logout`).post(auth, logout);

router.post(`/logoutAll`, auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

/* =========================================
   UPLOAD AVATAR CONFIGURE AND UPLOAD ROUTE
============================================ */

router
  .route(`/me/avatar`)
  .post(auth, upload.single("avatar"), uploadImage, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  });

/* =========================================
   UPDATE USER
============================================ */

router.route(`/me`).patch(auth, updateUser);

/* =========================================
   DELETE USER
============================================ */

router.route(`/me`).delete(auth, deleteUser);

/* =========================================
   DELETE USER
============================================ */

router.route(`/me/avatar`).delete(auth, async (req, res) => {
  console.log('req.user delete image',req.user);
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
