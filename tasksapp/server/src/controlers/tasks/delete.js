const Task = require("../../models/task");

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) return res.send(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteSubTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.status(404).send();
    }

    const index = task.sub_tasks.findIndex(
      (sub) => String(sub._id) === String(req.params.subId)
    );

    if (index === -1) return res.status(404).send();

    const sub_task = task.sub_tasks.splice(index, 1);

    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
