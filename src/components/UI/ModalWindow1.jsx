import React from "react";
import styles from "./ModalWindow1.module.scss";
import PropTypes from "prop-types";

export default function ModalWindow1({ isActive, setActive, children }) {
  return (
    <div
      className={styles.modal + " " + (isActive ? styles.active : "")}
      onClick={(e) => {
        if (!e.target.closest(`.${styles.modalContent}`)) {
          setActive(false);
        }
      }}
    >
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
}

ModalWindow1.propTypes = {
  isActive: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.object,
};
