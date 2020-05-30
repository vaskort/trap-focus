import React, { Fragment, useCallback, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ visible, onClose }) => {
  const modal = useRef(null);

  const trapFocus = useCallback((element, prevFocusableElement = document.activeElement) => {
    const focusableEls = Array.from(
      element.current.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      )
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;

    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;

    const handleFocus = e => {
      e.preventDefault();
      // if the focused element "lives" in your modal container then just focus it
      if (focusableEls.includes(e.target)) {
        currentFocus = e.target;
      } else {
        // you're out of the container
        // if previously the focused element was the first element then focus the last 
        // element - means you were using the shift key
        if (currentFocus === firstFocusableEl) {
          lastFocusableEl.focus();
        } else {
          // you previously were focused on the last element so just focus the first one
          firstFocusableEl.focus();
        }
        // update the current focus var
        currentFocus = document.activeElement;
      }
    };

    document.addEventListener("focus", handleFocus, true);

    return {
      onClose: () => {
        document.removeEventListener("focus", handleFocus, true);
        prevFocusableElement.focus();
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    
    const trapped = trapFocus(modal);

    return () => {
      trapped.onClose();
    };
  },[visible, trapFocus]);

  return (
    visible && (
      <Fragment>
        <div tabIndex="0"></div>
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
        <div tabIndex="0"></div>
      </Fragment>
    )
  );
};

export default Modal;
