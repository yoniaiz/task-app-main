import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ButtonWithLoader from "../../utils/ButtonWithLoader";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//colors
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

// icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

//redux
import { connect } from "react-redux";
import { updateSubTask, addSubTask, deleteSubTask } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  addNew: {
    margin: "0 auto",
    fontSize: "2em",
  },
  clear: {
    transition: ".5s",
    "&:hover": {
      color: red[500],
    },
  },
  edit: {
    transition: ".5s",
    "&:hover": {
      color: green[500],
    },
  },
}));

const EditTaskInput = ({
  taskDetails,
  setTaskDetails,
  setToggleInput,
  saveButtonOnClick,
  setUpdateTaskInput,
  error,
  setError,
}) => {
  return (
    <div className="add-new-task-input-container">
      <TextField
        id="standard"
        className="add-task-input"
        placeholder="My new task..."
        value={taskDetails}
        error={error}
        onChange={(e) => setTaskDetails(e.target.value)}
        fullWidth
      />
      <div className="button-container">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setError(false);
            setUpdateTaskInput(false);
            setToggleInput(false);
          }}
        >
          Cancel
        </Button>
        <ButtonWithLoader
          classes={{}}
          handleSubmit={saveButtonOnClick}
          fullWidth={false}
          content={"save"}
        />
      </div>
    </div>
  );
};

const CheckboxList = ({ addTask, deleteTask, updateTask, id, tasks }) => {
  const classes = useStyles();

  const [toggleInput, setToggleInput] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [updateTaskInput, setUpdateTaskInput] = React.useState(null);
  const [taskDetails, setTaskDetails] = React.useState("");

  const handleToggle = (value) => () => {
    updateTask({ completed: !value.completed }, id, value._id);
  };

  const preperForUpdate = (value) => {
    setTaskDetails(value.description);
    setToggleInput(false);
    setUpdateTaskInput(value._id);
  };

  const toggle = () => {
    setTaskDetails("");
    setUpdateTaskInput(null);
    if (!toggleInput) setToggleInput(true);
  };

  const handleDelete = (value) => {
    deleteTask(id, value._id);
  };

  const resetTaskFields = () => {
    setTaskDetails("");
    setError(false);
    setUpdateTaskInput(null);
    setToggleInput(false);
  };

  const handleAddTask = () => {
    if (taskDetails) {
      addTask({ description: taskDetails }, id, () => {
        resetTaskFields();
      });
    } else {
      setError(true);
    }
  };

  const updateTaskDescription = (value) => {
    if (taskDetails) {
      updateTask({ description: taskDetails }, id, value._id, () => {
        resetTaskFields();
      });
    } else {
      setError(true);
    }
  };

  return (
    <Fragment>
      <List className={classes.root}>
        {tasks.map((value) => {
          const labelId = `checkbox-list-label-${value._id}`;

          if (updateTaskInput === value._id) {
            return (
              <Fragment  key={value._id}>
                <EditTaskInput
                  setUpdateTaskInput={setUpdateTaskInput}
                  handleAddTask={handleAddTask}
                  taskDetails={taskDetails}
                  setTaskDetails={setTaskDetails}
                  setToggleInput={setToggleInput}
                  error={error}
                  setError={setError}
                  saveButtonOnClick={() => updateTaskDescription(value)}
                />
              </Fragment>
            );
          }
          return (
            <ListItem
              key={value._id}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                className="sub-task-description"
                id={labelId}
                primary={value.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => preperForUpdate(value)}
                >
                  <EditIcon className={classes.edit} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => handleDelete(value)}
                >
                  <ClearIcon className={classes.clear} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem role={undefined} dense button onClick={toggle}>
          {toggleInput ? (
            <EditTaskInput
              setError={setError}
              setUpdateTaskInput={setUpdateTaskInput}
              saveButtonOnClick={handleAddTask}
              taskDetails={taskDetails}
              setTaskDetails={setTaskDetails}
              setToggleInput={setToggleInput}
              error={error}
            />
          ) : (
            <AddIcon className={classes.addNew} />
          )}
        </ListItem>
      </List>
    </Fragment>
  );
};

CheckboxList.propTypes = {
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  addTask: (task, id, callback) => dispatch(addSubTask(task, id, callback)),
  deleteTask: (id, taskId, callback) =>
    dispatch(deleteSubTask(id, taskId, callback)),
  updateTask: (task, id, taskId, callback) =>
    dispatch(updateSubTask(task, id, taskId, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxList);
