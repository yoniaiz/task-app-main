import React, { Fragment, useState, useEffect } from "react";
import Card from "./Card";
import { Typography, Container } from "@material-ui/core";

export default ({ tasks }) => {
  const [tasksEl, setTasksEl] = useState(null);

  useEffect(() => {
    setTasksEl(
      Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <Fragment key={task._id}>
            <Card task={task} />
          </Fragment>
        ))
      ) : (
        <Container style={{ textAlign: "center" }}>
          <Typography color="secondary" variant="h3">
            Tasks were not created yet.
          </Typography>
        </Container>
      )
    );
  }, [tasks]);

  return tasksEl
};
