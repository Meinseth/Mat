import { useState } from 'react';
import { ModalContext, type ModalType } from './ModalContext';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    return (
        <ModalContext.Provider
            value={{
                activeModal,
                openModal: setActiveModal,
                closeModal: () => setActiveModal(null),
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
