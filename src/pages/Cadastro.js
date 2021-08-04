import { auth, database } from "../firebase";
import React, { useRef } from "react";
import("./cad.css");

const Cadastro = () => {
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ref = database.ref("usuarios/");

  const singUp = (e) => {
    let nome = nomeRef?.current?.value;
    let email = emailRef?.current?.value;
    let password = passwordRef?.current?.value;
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const uid = resp?.user?.uid;
        ref.child(uid).push({
          nome,
          email,
          password,
        });
      })
      .catch((e) => {
        e?.code === "auth/weak-password"
          ? alert("Senhas deve conter no mínimo 6 dígitos")
          : alert(e?.message);
      });
  };

  return (
    <div
      style={{
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="center2">
        <h1 className="nome" style={{ marginLeft: "20px" }}>
          Cadastro
        </h1>
        <form>
          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input type="text" ref={nomeRef} required="required" />
            <span>Nome</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input type="text" ref={emailRef} required="required" />
            <span>Email</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px" }}
            className="inputbox2"
          >
            <input type="password" ref={passwordRef} required="required" />
            <span>Senha</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              style={{ width: "120px", marginTop: "-20px" }}
              className="inputbox3"
            >
              <button type="submit" style={{ backgroundColor: "dodgerblue" }}>
                <a href="/">Voltar</a>
              </button>
            </div>
            <div
              style={{ width: "120px", marginTop: "-20px" }}
              className="inputbox2"
            >
              <button
                onClick={singUp}
                type="submit"
                value="Enviar"
                style={{ cursor: "pointer" }}
              >
                <a>Enviar</a>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
