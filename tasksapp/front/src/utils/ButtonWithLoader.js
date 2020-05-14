import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

export default ({ handleSubmit, classes, content, fullWidth = true }) => {
  const { loading } = useSelector((state) => state.ui);
  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      onClick={handleSubmit}
      variant="contained"
      color="primary"
      disabled={loading}
      className={classes.submit}
      style={{ color: loading ? "transparent" : "" }}
    >
      {content}
      {loading && <CircularProgress size={18} className={"progress"} />}
    </Button>
  );
};
