import React from "react";
import { Grid, Button, Typography, TextField } from "@material-ui/core";

import useStyles from "../styles/styles.js";

function Enter() {
  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center">
        <Grid className={classes.heading} item spacing={4} align="center">
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
          <TextField label="Username" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={{ marginTop: "14px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Enter;
