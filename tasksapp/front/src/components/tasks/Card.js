import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
//components
import Checkbox from "./Checkbox";
import Dialog from "../AddTask/Dialog";
import CheckList from "./CheckList";
import Map from "../../components/Map";
//Material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Day js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//redux
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../redux/actions";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "fit-content",
    height: "fit-content",
    padding: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TaskCard = ({ task, deleteTask, updateTask }) => {
  const classes = useStyles();
  const {
    completed,
    createdAt,
    description,
    updatedAt,
    title,
    _id,
    sub_tasks,
  } = task;
  const [data, setData] = useState({
    completed,
  });
  const ref = useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateTask(data, _id);
  };

  useEffect(() => {
    if (completed !== data.completed) handleUpdate();
  }, [data]);

  dayjs.extend(relativeTime);

  return (
    <Card className={`${classes.root} task-card`} ref={ref}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Created {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <CheckList id={_id} tasks={sub_tasks} />
      </CardContent>
      <CardActions>
        <Checkbox completed={data.completed} setData={setData} />
        <Button size="small" onClick={() => deleteTask(_id)}>
          Delete
        </Button>

        <Button size="small" onClick={handleClickOpen}>
          Update
        </Button>
        <Map />
        <Dialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          taskOrigin={task}
          update
        />
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask(id)),
  updateTask: (data, id) => dispatch(updateTask(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
