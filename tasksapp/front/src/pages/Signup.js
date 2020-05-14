import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ButtonWithLoader from "../utils/ButtonWithLoader";
import { history } from "../utils/history";
// Material ui
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//redux
import { connect } from "react-redux";
import { signup } from "../redux/actions";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ signup, errors, auth }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    age: 0,
    email: "",
    password: "",
  });

  if (auth.authenticated) {
    history.push("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="username"
                name="name"
                error={errors["name"]}
                variant="outlined"
                required
                fullWidth
                id="username"
                onChange={handleChange}
                label="User name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                error={errors["age"]}
                required
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
                onChange={handleChange}
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={errors["email"]}
                id="email"
                onChange={handleChange}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                onChange={handleChange}
                label="Password"
                error={errors["password"]}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <ButtonWithLoader
            handleSubmit={handleSubmit}
            classes={classes}
            content={"Sign up"}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Typography component={Link} to={"/login"} variant="body2">
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Signup.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
    errors: auth.errors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
