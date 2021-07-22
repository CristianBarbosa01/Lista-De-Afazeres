import { useState } from "react";
import React from "react";
import Modal from "../components/Modal";
import "../components/Modal.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

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
        <strong style={{ fontSize: 30, }}>+</strong>
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default Home;
