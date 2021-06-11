import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";

import axios from "axios";

import UsersInRoom from "./UsersInRoom";

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(0);
  const [isHost, setHost] = useState(false);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    getRoomDetails();
  }, []);

  function getRoomDetails() {
    axios
      .get("http://localhost:8000/api/get-room" + "?code=" + params.roomCode, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        setVotesToSkip(data.votes_to_skip);
        data.is_host ? setHost("true") : setHost("false");
      })
      .catch((err) => {
        console.log(err);
        history.push("/home");
      });
  }

  function leaveRoomClicked() {
    axios
      .post(
        "http://localhost:8000/api/leave-room",
        { user: "kiran" },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push("/home");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Grid container align="center">
        {votesToSkip && isHost ? (
          <>
            <Grid item xs={12} align="center">
              <Typography variant="h4" color="initial">
                Votes to skip : {votesToSkip}
              </Typography>
            </Grid>
            <Grid item xs={12} aligin="center">
              <Typography variant="h4" color="initial">
                Is Host : {isHost}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" color="initial">
                code : {params.roomCode}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={leaveRoomClicked}
              >
                Leave Room
              </Button>
            </Grid>
            <Grid item xs={12}>
              <UsersInRoom roomCode={params.roomCode} />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <CircularProgress style={{ marginTop: "50vh" }} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Room;
