import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "@components/layout/Navbar";

import Routes from "@services/routing/Routes";

//Redux
import { Provider } from "react-redux";
import store from "./user/store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Routes />
        </>
      </Router>
    </Provider>
  );
}
export default App;
