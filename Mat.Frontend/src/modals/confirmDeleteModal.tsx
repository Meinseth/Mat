import Modal from './modal';
import styles from '../styles/styles.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    type: string;
    name: string;
}

export default function ConfirmDeleteModal(props: Props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <h1>Delete {props.type}</h1>
            <div>Are you sure to delete {props.name}</div>
            <div className={styles.strechButtons}>
                <button
                    className={styles.button + ' ' + styles.delete}
                    type="button"
                    onClick={props.onSuccess}
                >
                    Delete
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={props.onClose}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
