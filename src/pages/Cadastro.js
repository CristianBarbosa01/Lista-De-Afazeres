import { auth, database } from "../firebase";
import React, { useRef } from "react";
import animado from "../image/animado.jpg";
import("./cad.css");

const Cadastro = () => {
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ref = database.ref("usuarios");

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
        window.location.href = "/Home";
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
      <img style={{ height: "100vh", width: "100vw" }} src={animado}></img>
      <div style={{ marginTop: 100 }} className="center2">
        <h1 className="nome" style={{ marginLeft: "20px" }}>
          Cadastro
        </h1>
        <form>
          <div
            style={{ marginLeft: "20px", width: "17vw" }}
            className="inputbox2"
          >
            <input type="text" ref={nomeRef} required="required" />
            <span>Nome</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px", width: "17vw" }}
            className="inputbox2"
          >
            <input type="text" ref={emailRef} required="required" />
            <span>Email</span>
          </div>

          <div
            style={{ marginLeft: "20px", marginTop: "-20px", width: "17vw" }}
            className="inputbox2"
          >
            <input type="password" ref={passwordRef} required="required" />
            <span>Senha</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "22vw",
            }}
          >
            <div
              style={{ width: "100%", marginTop: "-20px" }}
              className="inputbox3"
            >
              <button
                onClick={() => (window.location.href = "/")}
                style={{ backgroundColor: "dodgerblue", marginLeft: "35px" }}
              >
                <p>Voltar</p>
              </button>
            </div>
            <div style={{ marginTop: "-20px" }} className="inputbox2">
              <button
                onClick={singUp}
                type="submit"
                value="Enviar"
                style={{ cursor: "pointer" }}
              >
                <p>Enviar</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
