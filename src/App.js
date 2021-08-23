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
    <div style={{width:"100%"}} className="App">
      <Router>
        {telaAtual !== "/" && telaAtual !== "/Cadastro" && (
          <header style={{width:"95.5%"}}>
            <FaBars
              style={{ cursor: "pointer" }}
              onClick={() => setShowNav(!showNav)}
            />
          </header>
        )}
        <Navbar show={showNav} />
        <Switch>
          <Route path="/" exact={true} component={LoginForm} />
          
          {telaAtual && <Route path="/Cadastro" exact={true} component={Cadastro} />}
          <Route path="/Home" exact={true} component={Home} />
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