import React, { lazy, Suspense, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";

//utils
import { history } from "./utils/history";
import AuthRoute from "./utils/AuthRoute";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actions";

//components
import LoadingPage from "./components/MainLoader";
import Navbar from "./components/Navbar";
// Lazy
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const dispatch = useDispatch();
  const { mainLoader } = useSelector((state) => state.ui);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getUser(token));
  }, []);

  return (
    <Router history={history}>
      {mainLoader && <LoadingPage />}
      <Navbar />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <AuthRoute exact path={"/"} component={Home} />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <AuthRoute exact path={"/users/:id"} component={Profile} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
