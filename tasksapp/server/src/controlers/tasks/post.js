const Task = require("../../models/task");

exports.addTask = async (req, res, next) => {
  console.log(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.addSubTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).send("task not exist");
    }

    task.sub_tasks.push({ description: req.body.description });
    await task.save();
    return res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
