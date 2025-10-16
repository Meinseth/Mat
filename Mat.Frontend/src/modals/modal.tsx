import React, { useState } from 'react';
import styles from '../styles/styles.module.css';
import { Edit, Trash, X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onDelete?: () => void;
    onEdit?: () => boolean;
}

export default function Modal({
    isOpen,
    onClose,
    children,
    onDelete,
    onEdit,
}: Props) {
    const initialEdit = onEdit ? onEdit() : false;
    const [isEdit, setIsEdit] = useState(initialEdit);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEditClick = () => {
        setIsEdit((prev) => !prev);
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
                    {onDelete && (
                        <Edit
                            className={`${styles.invisibleButton} ${
                                isEdit ? styles.editActive : ''
                            }`}
                            onClick={handleEditClick}
                        />
                    )}
                    <X className={styles.invisibleButton} onClick={onClose} />
                </div>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
}
