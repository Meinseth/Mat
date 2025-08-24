import React from "react";
import styles from "../../styles/styles.module.css";
import { Trash, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onDelete?: () => void;
}

export default function Modal(props: Props) {
  if (!props.isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };
  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalTop}>
          {props.onDelete && (
            <Trash
              className={styles.invisibleButton}
              onClick={props.onDelete}
            />
          )}
          <X className={styles.invisibleButton} onClick={props.onClose} />
        </div>
        <div className={styles.modalContent}>{props.children}</div>
      </div>
    </div>
  );
}
