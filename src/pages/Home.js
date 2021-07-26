import React, { useState } from "react";
import bloco from "../image/bloco.png";

const Home = () => {
  const [modalLogin, setModalLogin] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={bloco} className="imagem"></img>
    </div>
  );
};

export default Home;
