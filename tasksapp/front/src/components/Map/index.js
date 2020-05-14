import React from "react";
import Dialog from "./Dialog";
import ToolTipButton from "../../utils/TooltipButton";

import Button from "@material-ui/core/Button";

import EditLocationIcon from "@material-ui/icons/EditLocation";
export default () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ToolTipButton
        tip={"Edit Task Location"}
        btnClassName={"map-icon-button"}
        onClick={handleClickOpen}
      >
        <EditLocationIcon />
      </ToolTipButton>

      <Dialog open={open} handleClose={handleClose} />
    </div>
  );
};
