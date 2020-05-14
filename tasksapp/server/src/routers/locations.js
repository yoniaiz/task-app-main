const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  getLocations,
  addLocation,
  predictions,
} = require("../controlers/locations");

router.route("/").get(auth, getLocations);
router.route("/search").get(auth, predictions);
router.route("/:id").post(auth, addLocation);

module.exports = router;
