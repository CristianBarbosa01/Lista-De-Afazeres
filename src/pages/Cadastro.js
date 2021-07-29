import React from "react";
import { useState } from "react";
import("./cad.css");

const Cadastro = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    if (user.password === user.confirmPassword) {
      console.log(
        user.userName,
        user.email,
        user.password,
        user.confirmPassword
      );
    } else {
      alert("Senha não estão iguais");
    }
    e.preventDefault();
  };

  const onChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{ overflow: "auto", display: "flex", justifyContent: "center" }}
    >
      <div className="center2">
        <h1 className="nome" style={{ marginLeft: "20px" }}>
          Cadastro
        </h1>
        <form onSubmit={handleSubmit}>
          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={onChangeUser}
              required="required"
            />
            <span>Nome</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={onChangeUser}
              required="required"
            />
            <span>Email</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input
              type="password"
              value={user.password}
              onChange={onChangeUser}
              name="password"
              required="required"
            />
            <span>Senha</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input
              type="password"
              value={user.confirmPassword}
              onChange={onChangeUser}
              name="confirmPassword"
              required="required"
            />
            <span>Confirmar senha</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input type="submit" value="Enviar" style={{ cursor: "pointer" }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
