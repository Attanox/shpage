import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Hero from "./components/layout/Hero";

import { VerticalSpace } from "./components/styled/main";

import "./App.css";

const NavbarSpace = styled.div`
  width: 100%;
  height: 10vh;
  @media (max-width: 600px) {
    height: 15vh;
  }
`;

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <NavbarSpace />
        <VerticalSpace />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/hero/:heroIndex" component={Hero} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
