import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ButtonWithLoader from "../utils/ButtonWithLoader";
import { history } from "../utils/history";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// redux
import { connect } from "react-redux";
import { login } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ userLogin, auth }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  if (auth.authenticated) {
    history.push("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <ButtonWithLoader
            handleSubmit={handleSubmit}
            classes={classes}
            content={"login"}
          />

          <Grid container style={{ textAlign: "center" }}>
            <Typography component={Link} to="/signup" variant="body1">
              {"Don't have an account? Sign Up"}
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
