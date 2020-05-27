import React, { Fragment, useEffect, useRef, useCallback } from "react";
import styles from "./Modal.module.css";

const Modal = ({ visible, onClose }) => {
  const modal = useRef(null);

  const trapFocus = useCallback((element, prevFocusableElement = document.activeElement) => {
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
    if (!visible) return;
    
    const removeListener = trapFocus(modal.current);

    return () => {
      removeListener.onClose();
    };
  },[visible, trapFocus]);

  return (
    visible && (
      <Fragment>
        <div className={styles.overlay} />
        <div
          role="dialog"
          aria-labelledby="modalTitle"
          aria-modal="true"
          className={styles.modal}
          ref={modal}
        >
          <h2 id="modalTitle">Free Gift Form</h2>
          <form>
            <div className={styles.inputItem}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className={styles.input}
              />
            </div>
            <div className="input-item">
              <label htmlFor="surname" className={styles.label}>
                Surname
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Surname"
                className={styles.input}
              />
            </div>
          </form>
          <button onClick={onClose}>Close Modal</button>
        </div>
      </Fragment>
    )
  );
};

export default Modal;
