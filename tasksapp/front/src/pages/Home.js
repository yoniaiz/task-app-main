import React from "react";
import PropTypes from "prop-types";

import Tasks from "../components/tasks";
import Map from "../components/Map";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { connect } from "react-redux";
const Home = ({ tasks }) => {
  return (
    <Container component="main" maxWidth="lg" className="tasks-container">
      <CssBaseline />
      <Tasks tasks={tasks} />
    </Container>
  );
};

Home.propTypes = {
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = ({ tasks: { tasks } }) => {
  return {
    tasks,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, { mapDispatchToProps })(Home);
