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

function EnterRoom() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const history = useHistory();

  function enterButtonClicked() {
    if (!code) {
      setError(true);
      setHelperText("Please enter a valid code!");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/enter-room",
        { roomCode: code },
        { withCredentials: true }
      )
      .then((res) => history.push(`/room/${code}`))
      .catch((err) => {
        if (err.response.status === 401) history.push("/home");
        else if (err.response.status === 404) {
          setError(true);
          setHelperText("Room not found!");
        }
      });
  }

  return (
    <>
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h1">Enter Room</Typography>
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
            variant="outlined"
            label="Enter code"
            error={error}
            helperText={helperText}
            onChange={(e) => setCode(e.target.value)}
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
            onClick={enterButtonClicked}
            size="large"
            style={{ marginLeft: "10px", width: "100px" }}
          >
            Enter
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EnterRoom;
