import React from "react";
import { Route } from "react-router-dom";

import Home from "./components/Home";
import Enter from "./components/Enter";

function App() {
  return (
    <>
      <Route exact path="/">
        <Enter />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
}

export default App;
