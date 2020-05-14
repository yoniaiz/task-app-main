const express = require("express");
const router = new express.Router();

const {
  addTask,
  addSubTask,
  getTasks,
  getTaskById,
  updateSubTask,
  updateTask,
  deleteTask,
  deleteSubTask,
} = require("../controlers/tasks");
const auth = require("../middleware/auth");
const Task = require("../models/task");

/* =========================================
   NEW TASK
============================================ */

router.route("").post(auth, addTask);
router.route("/:id/sub").post(auth, addSubTask);

router.route("").get(auth, getTasks);
router.route("/:id").get(auth, getTaskById);

router.route("/:id/sub/:subId").patch(auth, updateSubTask);
router.route("/:id").patch(auth, updateTask);

router.route("/:id").delete(auth, deleteTask);
router.route("/:id/sub/:subId").delete(auth, deleteSubTask);

module.exports = router;
