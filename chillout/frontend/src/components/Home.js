import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Redirect, Route } from "react-router-dom";
import { CircularProgress, Grid, Typography, Button } from "@material-ui/core";
import axios from "axios";

import ComponentWillMountFunction from "./ComponentWillMountFunction";
import useStyles from "../styles/styles.js";

function Home(props) {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const history = useHistory();
  const classes = useStyles();

  ComponentWillMountFunction(() => {
    console.log("PODS PATTI");
    fetchUsername();
  });

  function fetchUsername() {
    axios
      .get("http://localhost:8000/api/get-username-roomcode", {
        withCredentials: true,
      })
      .then(({ data: { currentUsername, roomCode } }) => {
        console.log(currentUsername, roomCode);
        setRoomCode(roomCode);
        setUsername(currentUsername);
      })
      .catch((err) => {
        console.log(`An error has occured ${err}`);
        history.push("/");
      });
  }

  function getMainContent() {
    return (
      <>
        <Grid container alignItems="center">
          <Grid item xs={12} align="center">
            <Typography variant="h3" color="initial">
              Welcome {username}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Ready to listen to some music?
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          align="center"
          direction="column"
          justify="center"
          style={{ minHeight: "60vh" }}
        >
          <Grid style={{ marginBottom: "14px" }} item xs={12} align="center">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => history.push("/create")}
            >
              Create Room
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              style={{ width: "157px" }}
              onClick={() => history.push("/join")}
            >
              Enter Room
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  function isUsernameAndRoomCode() {
    if (username) {
      if (roomCode) {
        return <Redirect to={`/room/${roomCode}`} />;
      } else {
        return getMainContent();
      }
    } else {
      return (
        <Grid container align="center">
          <Grid item xs={12}>
            <CircularProgress style={{ marginTop: "50vh" }} />
          </Grid>
        </Grid>
      );
    }
  }

  return <>{isUsernameAndRoomCode()}</>;
}

export default Home;
