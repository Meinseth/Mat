import { createContext, useContext, useState } from 'react'

type ModalType = 'addRecipe' | 'viewRecipe' | 'confirmation' | null

interface ModalContextType {
    activeModal: ModalType
    openModal: (modal: ModalType) => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

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

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context)
        throw new Error('useModalContext must be used inside ModalProvider')
    return context
}
