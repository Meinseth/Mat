import { createContext, useContext } from 'react';

export const ModalContext = createContext<ModalContextType | undefined>(
    undefined
);
export interface ModalContextType {
    activeModal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
}

export type ModalType = 'addRecipe' | 'viewRecipe' | 'confirmation' | null;

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error('useModalContext must be used inside ModalProvider');
    return context;
};
