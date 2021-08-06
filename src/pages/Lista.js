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
    <div className="uHome" style={{ backgroundColor:"#affff4" }}>
      <button
        style={{ right: 0, bottom: 40, margin: 20, position: "absolute", width:"60px", height:"60px", textAlign:"center" }}
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
                width: 1315,
                height: 100,
                borderRadius: 15,
                backgroundColor: "#ffb772",
                margin: 15,
                padding: 10,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
              }}
            >
              <table style={{ width: "100%", height: "100%" }}>
                <tr>
                  <td style={{ width: "20%", borderRadius: 15, backgroundColor:"#fff6be", textAlign:"center", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}>
                    <p>{`Data: ${t?.data?.replaceAll("-", "/")}`}</p>
                  {/* </td>
                  <td style={{ width: "10%", borderRadius: 15, backgroundColor:"#F5F5F5", textAlign:"center", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}> */}
                    <p>{`hora: ${t?.hora}`}</p>
                  </td>
                  {/* <td style={{ borderLeft:"5px solid #a5bfca", height:"100%" }}><p></p></td> */}
                  <td style={{ width: "80%", height: "100%" , backgroundColor:"#fff6be" , borderRadius: 15, boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}>
                    <p style={{marginLeft:"10px"}}>{`Descricao: ${t?.descricao}`}</p>
                  </td>
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
