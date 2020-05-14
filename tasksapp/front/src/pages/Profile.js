import React, { useState, useEffect } from "react";
import avatar from "../assets/images/avatar.png";
import axios from "axios";
//components
import Tooltip from "../utils/TooltipButton";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AddCircleIcon from "@material-ui/icons/AddCircle";

// Day js
import dayjs from "dayjs";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getUserById, profileImageUrl } from "../redux/actions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const Profile = ({
  match: {
    params: { id },
  },
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.auth);
  const { imageUrl } = useSelector((state) => state.ui);

  const forceUpdate = useForceUpdate();

  const [showAvatar, setShowAvatar] = useState(imageUrl);

  const [profile, setProfile] = useState({});

  const onError = () => {
    setShowAvatar(avatar);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", image, image.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("/api/users/me/avatar", formData, config)
      .then((response) => {
        const newUrl = URL.createObjectURL(image);
        setShowAvatar(newUrl);
        dispatch(profileImageUrl(newUrl));
      })
      .catch((error) => {
        //TODO show error notification
      });
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  useEffect(() => {
    if (credentials && credentials.user && credentials.user._id === id) {
      setProfile({ ...credentials.user });
    } else {
      dispatch(getUserById(id));
    }
  }, [id]);

  return (
    <div className="profile-page">
      <div className="card-container">
        <Card className={classes.root}>
          <CardActionArea>
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Tooltip
              tip={"Change Profile Image"}
              btnClassName={"add-image-button"}
              onClick={handleEditPicture}
            >
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                className="add-image-button"
              >
                <AddCircleIcon className="add-image-icon" />
              </IconButton>
            </Tooltip>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="240"
              onError={onError}
              image={showAvatar}
              title="Contemplative Reptile"
            />
            <CardContent className="card-content">
              <Typography
                gutterBottom
                variant="h5"
                color="textSecondary"
                component="h2"
              >
                {profile.email}
              </Typography>
              <Typography variant="body1" component="p">
                {profile.name} age {profile.age} <br /> user since:{" "}
                {dayjs(profile.createdAt).format("YYYY/MM/DD")}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className="card-button-container">
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="stats">
        <div className="box box1 hvr-underline-from-right">
          <span className="value">
            {profile.tasksCompleted ? profile.tasksCompleted : 0}
          </span>
          <span className="parameter">Completed tasks</span>
        </div>
        <div className="box box2 hvr-underline-from-right">
          <span className="value">
            {profile.tasksNotCompleted ? profile.tasksNotCompleted : 0}
          </span>
          <span className="parameter">Not Completed Tasks</span>
        </div>
        <div className="box box3 hvr-underline-from-right">
          <span className="value">
            {profile.sharedTasks ? profile.sharedTasks : 0}
          </span>
          <span className="parameter">Shared Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
