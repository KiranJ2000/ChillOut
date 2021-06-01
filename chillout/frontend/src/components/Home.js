import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { CircularProgress, Grid, Typography, Button } from "@material-ui/core";

function Home() {
  const [username, setUsername] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchUsername();
  }, []);

  function fetchUsername() {
    axios
      .get("http://localhost:8000/api/get-username", { withCredentials: true })
      .then(({ data: { currentUsername } }) => {
        //console.log(res);
        setUsername(currentUsername);
      })
      .catch((err) => {
        console.log(`An error has occured ${err}`);
        history.push("/");
      });
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h3" color="initial">
            Welcome {username ? username : <CircularProgress />}
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
          <Button variant="contained" size="large" color="primary">
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            style={{ width: "157px" }}
          >
            Enter Room
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
