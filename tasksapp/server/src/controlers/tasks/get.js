exports.getTasks = async (req, res, next) => {
  const match = {},
    sort = {};
  const { completed, limit, skip, sortBy } = req.query;

  if (completed) match.completed = completed.toLowerCase() === "true";

  if (sortBy) {
    const [sortByParam, sortDirection] = sortBy.split(":");
    sort[sortByParam] = sortDirection === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(limit),
          skip: parseInt(skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
