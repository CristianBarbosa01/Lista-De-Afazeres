import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import Modal from "../components/Modal";
import "../components/Modal.css";

const Home = () => {
  const [dados, setDados] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const tarefasRef = database.ref("tarefas");
  const user = localStorage.getItem("user");
  const uid = JSON.parse(user)?.uid;

  useEffect(() => {
    let tasks = [];
    tarefasRef.child(uid).once("value", (data) => {
      if (data?.val() !== null) {
        const valores = data?.val();
        Object?.keys(valores)?.map((key) => {
          tasks?.push({ key, ...valores[key] });
        });
        setTarefas(tasks);
      }
      return null;
    });
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
      style={{ backgroundColor: "#affff4", overflow: "auto" }}
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
                width: 1315,
                height: 120,
                borderRadius: 15,
                backgroundColor: "#ffb772",
                margin: 15,
                padding: 10,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
            >
              <table style={{ width: "100%", height: "100%" }}>
                <tr>
                  <td
                    style={{
                      width: "20%",
                      borderRadius: 15,
                      backgroundColor: "#fff6be",
                      textAlign: "center",
                      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    }}
                  >
                    <p>{`Data: ${t?.data?.replaceAll("-", "/")}`}</p>
                    <p>{`hora: ${t?.hora}`}</p>
                  </td>

                  <td
                    style={{
                      width: "80%",
                      height: "100%",
                      backgroundColor: "#fff6be",
                      borderRadius: 15,
                      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    }}
                  >
                    <p
                      style={{ marginLeft: "10px" }}
                    >{`Descricao: ${t?.descricao}`}</p>
                  </td>
                  <tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 2.5,
                      height: "100%",
                    }}
                  >
                    {!t.concluido && (
                      <td>
                        <button
                          className="btnTD"
                          onClick={() => complete(t.key)}
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          Concluida
                        </button>
                      </td>
                    )}
                    <td>
                      <button
                        className="btnTD"
                        onClick={() => editar(t)}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btnTD"
                        onClick={() => onDelete(t.key)}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                </tr>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
