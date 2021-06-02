import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import Enter from "./components/Enter";
import EnterRoom from "./components/EnterRoom";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";

function App() {
  return (
    <>
      <Route exact path="/">
        <Enter />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/create">
        <CreateRoom />
      </Route>
      <Route path="/join">
        <EnterRoom />
      </Route>
      <Route path="/room/:roomCode">
        <Room />
      </Route>
    </>
  );
}

export default App;
