import { createContext } from 'react';
import type { RecipeContextType } from './RecipeContextType';

export const RecipeContext = createContext<RecipeContextType | undefined>(
    undefined
);
