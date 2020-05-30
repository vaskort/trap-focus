import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal/Modal";

import "./App.css";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const trapFocus = useCallback((element, prevFocusableElement) => {
    console.log("element eisai", element);
    const focusableEls = Array.from(
      element.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), .modal__close'
      )
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;

    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;

    const onKeyDown = e => {
      console.log(e.target);
      e.preventDefault();
      if (focusableEls.includes(e.target)) {
        currentFocus = e.target;
      } else {
        // if you're on the first focusable element and using the shift key
        if (currentFocus === firstFocusableEl) {
          lastFocusableEl.focus();
        } else {
          // you're on the last so go to the first one
          firstFocusableEl.focus();
        }
        currentFocus = document.activeElement;
      }
    };

    document.addEventListener("focus", onKeyDown, true);

    return {
      onClose: () => {
        console.log("clear up events");
        document.removeEventListener("focus", onKeyDown);
        prevFocusableElement.focus();
      }
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    
    const removeListener = trapFocus(<Modal/>);

    return () => {
      removeListener.onClose();
    };
  },[modalOpen, trapFocus]);

  return (
    <div className="App">
      <h1>Trap Focus Function Example</h1>

      <button onClick={() => setModalOpen(!modalOpen)}>Open modal</button>
      <Modal visible={modalOpen} onClose={() => setModalOpen(!modalOpen)} />
    </div>
  );
}
