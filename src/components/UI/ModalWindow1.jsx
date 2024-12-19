import React, { useEffect } from "react";
import styles from "./ModalWindow1.module.scss";
import PropTypes from "prop-types";

export default function ModalWindow1({ isActive = true, onClose, children }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return (
    <div
      className={styles.modal + " " + (isActive ? styles.active : "")}
      onClick={() => onClose()}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalWindow1.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
};
