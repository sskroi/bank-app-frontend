import React, { useEffect } from "react";
import styles from "./ModalWindow1.module.scss";
import PropTypes from "prop-types";

export default function ModalWindow2({ onClose, children }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      className={styles.modal + " " + styles.active}
      onClick={(e) => {
        if (!e.target.closest(`.${styles.modalContent}`)) {
          onClose(e);
        }
      }}
    >
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
}

ModalWindow2.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.object,
};
