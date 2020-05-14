import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

AuthRoute.protoTypes = {
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth.authenticated,
  };
};

export default connect(mapStateToProps)(AuthRoute);
