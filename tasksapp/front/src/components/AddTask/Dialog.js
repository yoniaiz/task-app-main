import React, { useState, useEffect } from "react";

//MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

//REDUX
import { connect } from "react-redux";
import { addTask, updateTask } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  open,
  handleClose,
  createTask,
  update,
  updateTask,
  taskOrigin,
}) => {
  const classes = useStyles();
  const [task, setTask] = useState({});

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!open) {
      setTask({});
    } else {
      if (taskOrigin && Object.keys(task).length === 0) {
        setTask({
          title: taskOrigin.title,
          description: taskOrigin.description,
        });
      }
    }
  }, [open, taskOrigin]);

  const handleSubmit = () => {
    if (update) updateTask(task, taskOrigin._id, handleClose);
    else createTask(task, handleClose);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {update ? "Update task" : "Add new task"}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Title"
              color="primary"
              name="title"
              value={task.title || ""}
              placeholder="Title..."
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Description"
              multiline
              value={task.description || ""}
              name="description"
              placeholder="Description..."
              color="primary"
              onChange={handleChange}
              required
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleSubmit} color="primary" fullWidth>
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  createTask: (task, handleClose) => dispatch(addTask(task, handleClose)),
  updateTask: (task, id, handleClose) =>
    dispatch(updateTask(task, id, handleClose)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenDialog);
