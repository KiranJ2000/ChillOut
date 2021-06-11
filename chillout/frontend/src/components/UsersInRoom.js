import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

import axios from "axios";

import useInterval from "./useInterval";

function UsersInRoom(props) {
  const [inRoomUsers, setUsers] = useState([false]);

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
      });
  }, 2000);

  return (
    <>
      {inRoomUsers[0] ? (
        inRoomUsers.map((user) => {
          return <h2 key={user}>{user}</h2>;
        })
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default UsersInRoom;
