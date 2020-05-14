import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//components
import AddTask from "../AddTask";
import UserLink from "./UserLink";

//utils
import TooltipButton from "../../utils/TooltipButton";
import { history } from "../../utils/history";

// MATETIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";

// ICONS
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//retux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const { authenticated, credentials } = useSelector((state) => state.auth);
  const { imageUrl } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <TooltipButton tip={"home"} onClick={() => history.push("/")}>
                <HomeIcon />
              </TooltipButton>
              <AddTask />
              <TooltipButton tip={"Logout"} onClick={() => dispatch(logout())}>
                <ExitToAppIcon />
              </TooltipButton>
              <TooltipButton
                tip={"Profile"}
                onClick={() => history.push(`/users/${credentials.user._id}`)}
              >
                <UserLink credentials={credentials} imageUrl={imageUrl} />
              </TooltipButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to={"/login"}>
                Login
              </Button>
              <Button color="inherit" component={Link} to={"/signup"}>
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
