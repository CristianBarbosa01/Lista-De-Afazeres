import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function Modal(props) {
  const [dados, setDados] = useState({ data: "", hora: "", descricao: "" });
  const user = localStorage.getItem("user");
  const uid = JSON.parse(user)?.uid;
  const tarefas = firebase.database().ref("tarefas");
  const createTodo = async () => {
    const dadosTarefa = { ...dados, concluido: false };
    if (dados?.data !== "" && dados?.descricao && dados?.hora) {
      await tarefas.child(uid).push(dadosTarefa);
      window.location.reload();
    } else {
      window.alert("Preencha todos os campos");
    }
  };

  const updateTodo = async () => {
    const dadosTarefa = { ...dados };
    if (dados?.descricao !== "") {
      await tarefas.child(uid).child(dados?.key).update(dadosTarefa);
      window.location.reload();
    } else {
      window.alert("Preencha todos os campos");
    }
  };

  const edicao = props?.dados?.key !== undefined;

  useEffect(() => {
    if (edicao) {
      setDados(props?.dados);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => props?.closeModal(false)}> X </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-50px",
            }}
          >
            <h1>{edicao ? "Editar atividade" : "Cadastrar atividades"}</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
              }}
            >
              <p>Data</p>
              <input
                onChange={(e) => setDados({ ...dados, data: e.target.value })}
                value={dados.data}
                type="date"
                name="data"
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
                marginLeft: "40px",
              }}
            >
              <p>Hora</p>
              <input
                onChange={(e) => setDados({ ...dados, hora: e.target.value })}
                value={dados.hora}
                type="time"
                name="hora"
              ></input>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>Tarefa</p>
            <textarea
              onChange={(e) =>
                setDados({ ...dados, descricao: e.target.value })
              }
              value={dados.descricao}
              placeholder="Descrição"
              style={{
                minHeight: 150,
                minWidth: 500,
                maxHeight: 150,
                maxWidth: 500,
              }}
            ></textarea>
          </div>
          <div className="footer" style={{ margin: "10px" }}>
            <button
              onClick={() => props?.closeModal(false)}
              id="cancelBtn"
              style={{ width: "120px" }}
            >
              Cancelar
            </button>
            <button
              onClick={() =>
                props?.dados?.key !== undefined ? updateTodo() : createTodo()
              }
              style={{ width: "120px" }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
