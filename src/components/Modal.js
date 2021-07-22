import React from "react";

function Modal({ closeModal }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-50px",
            }}
          >
            <h1>Cadastrar atividades</h1>
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
              <input type="date" name="data"></input>
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
              <input type="time" name="hora"></input>
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
              placeholder="Digite sua tarefa!"
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
              onClick={() => closeModal(false)}
              id="cancelBtn"
              style={{ width: "120px" }}
            >
              Cancelar
            </button>
            <button style={{ width: "120px" }}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
