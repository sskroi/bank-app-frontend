import React, { FC } from "react";
import styles from "./BSModal.module.scss";
import { CloseButton, Modal } from "react-bootstrap";

interface BSModalProps {
  header: string;
  footer?: React.ReactNode;
  active?: boolean;
  onClose: () => void;
  size?: "sm" | "lg" | "xl";
  children: React.ReactNode;
}

const BSModal: FC<BSModalProps> = ({
  active = true,
  onClose,
  header,
  children,
  footer,
  size,
  ...props
}) => {
  return (
    <Modal
      show={active}
      onHide={onClose}
      contentClassName={styles.modalContent}
      size={size}
      dialogClassName={styles.customModal}
      {...props}
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
};

export default BSModal;
