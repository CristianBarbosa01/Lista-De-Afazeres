import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import Modal from "../components/Modal";
import "../components/Modal.css";

const Lista = () => {
  const [dados, setDados] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  const [praFazer, setPraFazer] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const tarefasRef = database.ref("tarefas");
  const user = localStorage.getItem("user");
  const uid = JSON.parse(user)?.uid;
  const colunas = [
    {
      titulo: "Pendentes",
      tipo: "PENDENTES",
      corFundo: "#0089CB",
      fundo: "#00AAFF",
    },
    {
      titulo: "Concluídos",
      tipo: "CONCLUIDO",
      corFundo: "#3BA36C",
      fundo: "#45CD8B",
    },
  ];
  const botoes = [
    { icone: "🗑️", tipo: "REMOVER", titulo: "Remover tarefa" },
    { icone: "✏️", tipo: "ATUALIZAR", titulo: "Atualizar tarefa" },
    {
      multiplo: true,
      icone: ["✔️", "❌"],
      tipo: ["CONCLUIR", "DESFAZER"],
      titulo: ["Concluir tarefa", "Desfazer tarefa"],
    },
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

  const getAcaoBotao = (t, botao) => {
    if (botao?.multiplo) {
      if (t?.concluido) {
        complete(t?.key, false);
      } else {
        complete(t?.key, true);
      }
    } else {
      if (botao?.tipo === "REMOVER") onDelete(t?.key);
      if (botao?.tipo === "ATUALIZAR") editar(t);
    }
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
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.6)",
            }}
          >
            <div style={{ width: "100%", margin: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#E6E7E2",
                  borderRadius: 15,
                }}
              >
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
              <div style={{ padding: 10 }}>
                <p
                  style={{ width: "100%", fontSize: "20px" }}
                >{`${t?.descricao}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 15,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {botoes?.map((botao, index) => (
                  <button
                    key={`botao-${index}`}
                    className="btnTD"
                    onClick={() => getAcaoBotao(t, botao)}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      width: 50,
                      height: 50,
                      boxShadow: "5px 5px 3px -2px rgba(0,0,0,0.3)",
                      margin: 2,
                      backgroundColor: "#E6E7E2",
                      border: "none",
                    }}
                  >
                    {botao?.multiplo
                      ? t?.concluido
                        ? botao?.icone[1]
                        : botao?.icone[0]
                      : botao.icone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div style={{ height: "100vh"}}>
      <div
        className="uHome"
        style={{
          display: "flex",
          overflow: "auto",
          flexDirection: "row",
          height: "100vh",
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
        {openModal && (
          <div
            style={{
              flex: 1,
              backgroundColor: "coral",
              position: "absolute",
              right: "50%",
              left: "50%",
              top: 150,
            }}
          >
            <Modal closeModal={setOpenModal} dados={dados} />
          </div>
        )}
        {colunas?.map((coluna) => (
          <div
            style={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              width: "50%",
              backgroundColor: coluna.corFundo,
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50vw",
                backgroundColor: coluna.fundo,
              }}
            >
              <h1
                style={{ color: "#fff", marginTop: "90px", fontSize: "32px" }}
              >
                {coluna.titulo}
              </h1>
            </div>
            {coluna.tipo === "PENDENTES"
              ? getDadosColuna(praFazer)
              : coluna.tipo === "CONCLUIDO"
              ? getDadosColuna(concluidos)
              : getDadosColuna(tarefas)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lista;
