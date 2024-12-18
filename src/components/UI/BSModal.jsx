import React, { useEffect } from "react";
import styles from "./BSModal.module.scss";
import PropTypes from "prop-types";
import { CloseButton, Modal } from "react-bootstrap";

export default function BSModal({
  active = true,
  onClose,
  header,
  children,
  footer,
  size,
}) {
  return (
    <Modal
      show={active}
      onHide={onClose}
      contentClassName={styles.modalContent}
      size={size}
      dialogClassName={styles.customModal}
    >
      {header && (
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title>{header}</Modal.Title>
          <CloseButton
            className={styles.closeButton}
            variant="white"
            onClick={onClose}
          />
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer
          className={`d-flex justify-content-center ${styles.modalFooter}`}
        >
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
}

BSModal.propTypes = {
  header: PropTypes.element,
  active: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.element,
};
