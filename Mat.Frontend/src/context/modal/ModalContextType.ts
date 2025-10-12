import type { ModalType } from './ModalType';

export interface ModalContextType {
    activeModal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
}
