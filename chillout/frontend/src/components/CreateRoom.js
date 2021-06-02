import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Button,
  Typography,
  TextField,
  FormHelperText,
} from "@material-ui/core";

import axios from "axios";

function CreateRoom() {
  const [votesToSkip, setVotesToSkip] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const history = useHistory();

  function onCreateButtonPressed(e) {
    if (!votesToSkip) {
      setError(true);
      setHelperText("Enter a valid number");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/create-room",
        {
          votes_to_skip: votesToSkip,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push("/room/" + res.data.code);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h1">Create Room</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        align="center"
        direction="column"
        justify="center"
        style={{ minHeight: "60vh" }}
      >
        <Grid xs={12} item align="center">
          <TextField
            required={true}
            type="number"
            variant="outlined"
            label="Votes required to skip song"
            error={error}
            helperText={helperText}
            onChange={(e) => setVotesToSkip(e.target.value)}
            inputProps={{
              min: 1,
              style: { textAlign: "center", fontSize: "20px" },
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push("/home")}
            size="large"
            style={{ width: "100px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onCreateButtonPressed}
            style={{ marginLeft: "10px", width: "100px" }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateRoom;
