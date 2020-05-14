const cors = require("cors");
const express = require("express");
const morgran = require("morgan");
const { handleError } = require("./helpers/error");
const connectDB = require("./db/mongoose");
connectDB();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
const locationsRouter = require("./routers/locations");

const app = express();

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use(morgran("dev"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/tasks/location", locationsRouter);
app.use(cors());

module.exports = app;
