import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import {
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Paper,
} from "@material-ui/core";

import axios from "axios";

import useInterval from "./useInterval";
import useStyles from "../styles/styles.js";

function UsersInRoom(props) {
  const [inRoomUsers, setUsers] = useState([false]);

  const classes = useStyles();
  const history = useHistory();

  useInterval(() => {
    axios
      .post(
        "http://localhost:8000/api/get-users",
        { code: props.roomCode },
        { withCredentials: true }
      )
      .then(({ data: { users } }) => {
        console.log(users);
        setUsers(users);
      })
      .catch((err) => history.push("/home"));
  }, 2000);

  return (
    <>
      <div className={classes.outerDiv}>
        <div className={classes.borderHeader}>
          <Typography className={classes.heading} variant="h3">
            Online
          </Typography>
        </div>
        <Paper elevation={3} className={classes.paper}>
          {inRoomUsers[0] ? (
            inRoomUsers.map((user) => {
              return (
                <div key={user}>
                  <span>
                    <div className={classes.circle}></div>
                  </span>
                  <span>
                    <h3 className={classes.userList}>{user}</h3>
                  </span>
                </div>
              );
            })
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </div>
    </>
  );
}

export default UsersInRoom;
