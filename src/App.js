import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lista from "./pages/Lista";
import Cadastro from "./pages/Cadastro";

import { FaBars } from "react-icons/fa";
import LoginForm from "./pages/LoginForm";

function App() {
  const [showNav, setShowNav] = useState(false);
  const telaAtual = window?.location?.pathname;

  return (
    <div className="App">
      <Router>
        {telaAtual !== "/" && telaAtual !== "/Cadastro" && (
          <header>
            <FaBars
              style={{ cursor: "pointer" }}
              onClick={() => setShowNav(!showNav)}
            />
          </header>
        )}
        <Navbar show={showNav} />
        <Switch>
          <Route path="/" exact={true} component={LoginForm} />
          <Route path="/Cadastro" exact={true} component={Cadastro} />
          <Route path="/Homer" exact={true} component={Home} />
          <Route path="/Lista" exact={true} component={Lista} />
        </Switch>
      </Router>

      <div>
        <footer>
          <small>{`Copyright © ${new Date().getFullYear()} Cristian Barbosa`}</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
