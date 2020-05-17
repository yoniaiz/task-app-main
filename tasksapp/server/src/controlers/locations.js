const Location = require("../models/Location");
const Task = require("../models/task");
const geocoder = require("../utils/geocoder");
const fetch = require("node-fetch");
//  @desc Get all Locations
// @route GET /api/v1/stores
exports.getLocations = async (req, res, next) => {
  try {
    const location = await Location.find();
    res.json({
      success: true,
      count: location.length,
      data: location,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//  @desc Create a store
// @route POST /api/v1/stores
exports.addLocation = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) return res.status(404).send();

    req.body.task = task;
    const location = await Location.create(req.body);

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: "This Location all ready exist" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

exports.predictions = async (req, res, next) => {
  const { address } = req.query;
  fetch(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${process.env.GEOCODER_API_KEY}&searchtext=${address}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
};
