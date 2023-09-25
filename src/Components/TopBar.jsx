import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../Assets/CSS/Navbar.css";
import { useKeycloak } from "@react-keycloak/web";
import { IconButton, Tooltip } from "@material-ui/core";
import HindiIcon from "../Assets/Images/Hindi.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginBottom: "10px",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
  btn_logout: {
    color: "white",
    borderColor: "gray",
    justifyContent: "space-around",
  },
}));

const TopBar = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak
        .loadUserInfo()
        .then((resp) => {
          sessionStorage.setItem("jwt_token", keycloak.token);
          sessionStorage.setItem("userInfo", JSON.stringify(resp));
          sessionStorage.setItem("username", resp.username);
          console.log("userLoginInfo", resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  setTimeout(() => {
    keycloak
      .updateToken(10000)
      .success((refreshed) => {
        if (refreshed) {
          console.debug("Token refreshed" + refreshed);
        } else {
          console.warn(
            "Token not refreshed, valid for " +
              Math.round(
                keycloak.tokenParsed.exp +
                  keycloak.timeSkew -
                  new Date().getTime() / 1000
              ) +
              " seconds"
          );
        }
      })
      .error(() => {
        console.error("Failed to refresh token");
      });
  }, 80000);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="nav_bar">
        <Toolbar>
          <Typography className={classes.title}>
            COSTACLOUD
            <span style={{ fontSize: ".6rem" }}>DASHBOARD</span>
          </Typography>
          {keycloak.authenticated && (
            <Tooltip title="Logout">
              <IconButton
                variant="outlined"
                color="secondary"
                position="fixed"
                className={classes.btn_logout}
                onClick={() => keycloak.logout()}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          )}
          <div className="icon_container">
            {/* <Tooltip title="Hindi">
              <IconButton>
                <HindiIcon />
              </IconButton>
            </Tooltip> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
