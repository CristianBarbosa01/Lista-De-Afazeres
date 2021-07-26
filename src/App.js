import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Lista from "./pages/Lista";
import { FaBars } from "react-icons/fa";
import ModalLog from "./pages/LoginForm";

function App() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="App">
      <Router>
        <header>
          <FaBars
            style={{ cursor: "pointer" }}
            onClick={() => setShowNav(!showNav)}
          />
        </header>
        <Navbar show={showNav} />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/Lista" exact={true} component={Lista} />
          <Route path="/Login" exact={true} component={ModalLog} />
        </Switch>
      </Router>

      <div>
        <footer>
          <small> Copyright © 2021 Cristian Barbosa</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
