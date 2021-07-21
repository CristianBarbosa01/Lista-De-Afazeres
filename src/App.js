import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import bloco from "./image/bloco.png";

import { FaBars } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <header>
        {" "}
        <FaBars />
        Lista De Afazeres
      </header>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={bloco} className="imagem"></img>
      </div>
      <div>
        <footer>
          <small> Copyright © Cristian Barbosa</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
