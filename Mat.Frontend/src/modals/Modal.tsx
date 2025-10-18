import React from 'react';
import styles from '../styles/styles.module.css';
import { Edit, Trash, X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onDelete?: () => void;
    isEdit?: boolean;
    onEdit?: () => void;
}

export default function Modal({
    isOpen,
    onClose,
    children,
    onDelete,
    isEdit,
    onEdit,
}: Props) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.modalTop}>
                    {onDelete && (
                        <Trash
                            className={styles.invisibleButton}
                            onClick={onDelete}
                        />
                    )}
                    {onEdit && (
                        <Edit
                            className={`${styles.invisibleButton} ${
                                isEdit ? styles.editActive : ''
                            }`}
                            onClick={onEdit}
                        />
                    )}
                    <X className={styles.invisibleButton} onClick={onClose} />
                </div>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
}
