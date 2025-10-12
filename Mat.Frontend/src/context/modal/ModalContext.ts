import { createContext } from 'react';
import type { ModalContextType } from './ModalContextType';

export const ModalContext = createContext<ModalContextType | undefined>(
    undefined
);
