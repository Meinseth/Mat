import { useState } from 'react'
import type { ModalType } from './ModalType'
import { ModalContext } from './modalContext'

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null)

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
    )
}
