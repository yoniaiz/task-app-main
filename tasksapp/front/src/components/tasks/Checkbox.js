import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels({ completed, setData }) {
  const handleChange = () => {
    setData({ completed: !completed });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Completed"
      />
    </FormGroup>
  );
}
