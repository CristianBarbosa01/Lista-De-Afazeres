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
  const complete = (key) => {
    if (window.confirm("certeza???")) {
      tarefasRef.child(uid).child(key).update({ concluido: true });
      window.location.reload();
    }
  };


  const editar = (tarefa) => {
    setOpenModal(true);
    setDados(tarefa);
  };

  return (
    <div
      className="uHome"
      style={{ backgroundColor: "#affff4", overflow: "auto", width: "100%" }}
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
      {tarefas?.length > 0 && (
        <div style={{ overflow: "auto" }}>
          {tarefas?.map((t, key) => (
            <div
              key={key}
              style={{
                width: "96%",
                height: 120,
                borderRadius: 15,
                backgroundColor: t?.concluido ? "green" : "#ffb772",
                margin: 15,
                padding: 10,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.6)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "15%",
                      height: "90%",
                      marginLeft: 20,
                      borderRadius: 20,
                      alignItems: "center",
                      boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                    }}
                  >
                    <p>{` ${t?.data?.replaceAll("-", "/")}`}</p>
                    <p>{`🕜 ${t?.hora}`}</p>
                  </div>
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      borderRadius: 20,
                      margin: 20,
                      boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                    }}
                  >
                    <p style={{ marginLeft: 30 }}>{`${t?.descricao}`}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      with: "100%",
                      height: "100%",
                      borderRadius: 20,
                    }}
                  >
                    <div style={{ margin: 10 }}>
                      {!t.concluido && (
                        
                        <button
                          className="btnTD"
                          onClick={() => complete(t.key)}
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            boxShadow: "10px 10px 5px -2px rgba(0,0,0,0.6)",
                            margin: 2,
                          }}
                        >
                        {!t.concluido ? '✔️' : '❌' }
                        </button>
                      )}

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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
