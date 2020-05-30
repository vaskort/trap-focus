import React, { Fragment } from "react";
import styles from "./Modal.module.css";

const Modal = ({ visible, onClose }) => {

  return (
    visible && (
      <Fragment>
        <div className={styles.overlay} />
        <div
          role="dialog"
          aria-labelledby="modalTitle"
          aria-modal="true"
          className={styles.modal}
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
