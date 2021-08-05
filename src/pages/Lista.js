import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import Modal from "../components/Modal";
import "../components/Modal.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const tarefasRef = database.ref("tarefas");
  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    let tasks = [];
    tarefasRef.child(uid).once("value", (data) => {
      const valores = data?.val();
      Object.keys(valores).map((key) => {
        tasks.push(valores[key]);
      });
      setTarefas(tasks);
    });
  }, []);

  console.log(tarefas);

  return (
    <div className="uHome">
      <button
        style={{ right: 0, bottom: 40, margin: 20, position: "absolute" }}
        id="btn"
        className="openModalBtn"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <strong style={{ fontSize: 30 }}>+</strong>
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
      {tarefas?.length > 0 && (
        <div style={{ overflow: "auto" }}>
          {tarefas?.map((t, key) => (
            <div
              key={key}
              style={{
                width: 500,
                minHeight: 100,
                borderRadius: 15,
                backgroundColor: "#f9f9f9",
                margin: 15,
                padding: 10,
              }}
            >
              <p>{`Data: ${t?.data?.replaceAll("-", "/")}`}</p>
              <p>{`Descricao: ${t?.descricao}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
