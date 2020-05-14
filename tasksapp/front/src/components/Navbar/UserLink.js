import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  avater: {
    width: "40px",
    height: "40px",
  },
  avatarName: {
    marginRight: "10px",
  },
}));

export default function LetterAvatars({ credentials, imageUrl }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {imageUrl ? (
        <Avatar className={`${classes.avater}`} src={imageUrl} />
      ) : (
        <Avatar className={`${classes.avater}`}>
          {credentials.user.name[0].toUpperCase()}
        </Avatar>
      )}
    </div>
  );
}
