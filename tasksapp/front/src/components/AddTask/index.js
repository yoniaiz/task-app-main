import React, { Component, Fragment } from "react";
import TooltipButton from "../../utils/TooltipButton";
import PropTypes from "prop-types";
//components
import Dialog from "./Dialog";
// REDUX
import { connect } from "react-redux";
import {} from "../../redux/actions";

// ICONS
import AddIcon from "@material-ui/icons/Add";

const AddTask = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TooltipButton tip={"New task"} onClick={handleClickOpen}>
        <AddIcon />
      </TooltipButton>
      <Dialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </Fragment>
  );
};

AddTask.propTypes = {
 
};

const mapStateToProps = ({ ui }) => {
  return {
    loading: ui.loading,
    errors: ui.errors,
  };
};

export default connect(mapStateToProps, {})(AddTask);
