import React, { useRef } from "react";
import { auth } from "../firebase";
import animado from "../image/animado.jpg";
import("./Log.css");

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((resp) => {
        localStorage?.removeItem("user");
        localStorage?.setItem(
          "user",
          JSON.stringify({
            email: emailRef.current.value,
            senha: passwordRef.current.value,
            uid: resp?.user?.uid,
          })
        );
        window.location.href = "/Home";
      })
      .catch((e) => {
        switch (e?.code) {
          case "auth/user-not-found":
            alert("Usuário não encontrado");
            break;
          case "auth/too-many-requests":
            alert("Muitas tentativas, tente de novo mais tarde");
            break;
          case "auth/wrong-password":
            alert("senha errada");
            break;
          default:
            alert(e?.message);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img style={{ height: "100vh", width: "100vw" }} src={animado}></img>

      <div style={{ marginTop: 100 }} className="center">
        <h1 style={{ marginLeft: "20px" }}>Login</h1>
        <form style={{}}>
          <div style={{ marginLeft: "20px" }} className="inputbox">
            <input ref={emailRef} type="text" required="required"></input>
            <span>Email</span>
          </div>
          <div style={{ marginLeft: "20px" }} className="inputbox">
            <input
              ref={passwordRef}
              type="password"
              required="required"
            ></input>
            <span>Senha</span>
          </div>
          <div
            style={{ marginLeft: "20px", width: "60%" }}
            className="inputbox"
          >
            <input style={{cursor:'pointer'}} onClick={singIn} type="submit" value="Enviar"></input>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <p>
              Não tem conta? <a href="/Cadastro"> Crie uma!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
