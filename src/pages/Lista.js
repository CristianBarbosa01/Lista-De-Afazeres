import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import Modal from "../components/Modal";
import "../components/Modal.css";

const Home = () => {
  const [dados, setDados] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  const [praFazer, setPraFazer] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const tarefasRef = database.ref("tarefas");
  const user = localStorage.getItem("user");
  const uid = JSON.parse(user)?.uid;
  const colunas = [
    { titulo: "Pendentes", tipo: "PENDENTES", corFundo: "#09f0f9" },
    { titulo: "Concluídos", tipo: "CONCLUIDO", corFundo: "green" },
  ];

  useEffect(async () => {
    let tasks = [];
    await tarefasRef.child(uid).once("value", (data) => {
      if (data?.val() !== null) {
        const valores = data?.val();
        Object?.keys(valores)?.map((key) => {
          tasks?.push({ key, ...valores[key] });
        });
        setTarefas(tasks);
      }
      return null;
    });

    let tarefasConcluidas = [];
    let tarefasPraFazer = [];
    tasks?.map((t) => {
      t?.concluido === true
        ? tarefasConcluidas?.push(t)
        : tarefasPraFazer?.push(t);
    });
    setConcluidos(tarefasConcluidas);
    setPraFazer(tarefasPraFazer);
  }, []);

  const onDelete = (key) => {
    if (window.confirm("certeza???")) {
      tarefasRef.child(uid).child(key).remove();
      window.location.reload();
    }
  };
  const complete = (key, status) => {
    if (window.confirm("certeza???")) {
      tarefasRef.child(uid).child(key).update({ concluido: status });
      window.location.reload();
    }
  };

  const editar = (tarefa) => {
    setOpenModal(true);
    setDados(tarefa);
  };

  const getDadosColuna = (array) => {
    return array?.map((t, key) => (
      <div key={`dado-${key}`}>
        <div style={{ display: "flex", alignItems: "center", padding: 15 }}>
          <div
            key={key}
            style={{
              flex: 1,
              borderRadius: 15,
              backgroundColor: "#ffb772",
              padding: 10,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.6)",
            }}
          >
            <div style={{width:'100%', margin:0,}}>
              <div style={{ display:"flex", justifyContent: 'space-evenly', backgroundColor:'#FFA54F', borderRadius:15, borderBottomLeftRadius:'0',borderBottomRightRadius:'0', marginTop:-10, marginLeft:-10, marginRight:-10 }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  borderRadius: 20,
                  alignItems: "center",
                }}
              >
                {t?.data?.replaceAll("-", "/")}
              </p>
              <p>🕜</p>
              <p>{t?.hora}</p>
              </div>
              <p
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                  margin: 20,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >{`${t?.descricao}`}</p>
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <button
              className="btnTD"
              onClick={() => complete(t.key, !t?.concluido)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                margin: 2,
              }}
            >
              {!t.concluido ? "✔️" : "❌"}
            </button>
            <button
              className="btnTD"
              onClick={() => editar(t)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                margin: 2,
              }}
            >
              ✏️
            </button>
            <button
              className="btnTD"
              onClick={() => onDelete(t.key)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                margin: 2,
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="uHome"
      style={{
        display: "flex",
        backgroundColor: "#affff4",
        overflow: "auto",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <button
        style={{
          right: 0,
          bottom: 40,
          margin: 20,
          width: "60px",
          height: "60px",
          textAlign: "center",
          position: "fixed",
        }}
        id="btn"
        className="openModalBtn"
        onClick={() => {
          setDados([]);
          setOpenModal(true);
        }}
      >
        <strong style={{ fontSize: 30 }}>+</strong>
      </button>
      {openModal && <Modal closeModal={setOpenModal} dados={dados} />}
      {colunas?.map((coluna) => (
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            backgroundColor: coluna.corFundo,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ color: "#fff" }}>{coluna.titulo}</h1>
          </div>
          {coluna.tipo === "PENDENTES"
            ? getDadosColuna(praFazer)
            : coluna.tipo === "CONCLUIDO"
            ? getDadosColuna(concluidos)
            : getDadosColuna(tarefas)}
        </div>
      ))}
    </div>
  );
};

export default Home;
