import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button, Typography, TextField } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import useStyles from "../styles/styles.js";

import axios from "axios";

function Enter() {
  const [username, setUsername] = useState("");
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    isUsernameAlreadyApplied();
  }, []);

  function isUsernameAlreadyApplied() {
    axios
      .get("http://localhost:8000/api/username-available", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        history.push("/home");
      })
      .catch((err) => null);
  }

  function onSubmitButton() {
    if (!username || !username.trim()) {
      setError(true);
      setErrorText("Please enter a valid username!");
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentUsername: username,
      }),
    };
    axios
      .post(
        "http://localhost:8000/api/set-username",
        {
          currentUsername: username,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push("/home");
      })
      .catch((err) => {
        setError(true);
        setErrorText("Username already taken!");
      });
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid className={classes.heading} item align="center">
          <Grid item xs={12}>
            <Typography variant="h1" color="textPrimary">
              ChillOut
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary">
              ChillOut lets you play music online through Spotify with anyone,
              anywhere. Create a new room or join an existing room and discover
              new music by listening together in real time.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        align="center"
        direction="column"
        justify="center"
        style={{ minHeight: "60vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Enter your username!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            error={isError}
            helperText={errorText}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={{ marginTop: "14px" }}
            onClick={onSubmitButton}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Enter;
