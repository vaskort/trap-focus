import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal/Modal";

import "./App.css";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <h1>Trap Focus Function Example</h1>

      <button onClick={() => setModalOpen(!modalOpen)} type="button" tabIndex="0">Open modal</button>
      <Modal visible={modalOpen} onClose={() => setModalOpen(!modalOpen)} />
    </div>
  );
}
