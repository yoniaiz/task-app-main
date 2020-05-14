const Task = require("../../models/task");

exports.updateSubTask = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowdUpdates = ["description", "completed"];

  const isValid = updates.every((update) => allowdUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      res.status(404).send();
    }

    let update = false;
    task.sub_tasks.forEach((sub) => {
      if (String(sub._id) === String(req.params.subId)) {
        update = true;
        updates.forEach((update) => (sub[update] = req.body[update]));
      }
    });

    if (update) {
      await task.save();
      res.send(task);
    } else res.status(404).send();
  } catch {
    res.status(400).send();
  }
};

exports.updateTask = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowdUpdates = ["title", "description", "completed"];

  const isValid = updates.every((update) => allowdUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid updates" });

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      res.status(404).send("task not exist");
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);

    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
