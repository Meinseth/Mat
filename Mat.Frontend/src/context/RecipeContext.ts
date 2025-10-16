import { createContext } from 'react';
import type { RecipeDto } from 'src/services/ApiClient';
import { useContext } from 'react';

export interface RecipeContextType {
    recipes: RecipeDto[];
    setRecipes: React.Dispatch<React.SetStateAction<RecipeDto[]>>;
    selectedRecipe: RecipeDto | null;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<RecipeDto | null>>;
    ApiAddRecipe: (recipe: RecipeDto) => void;
    ApiGetRecipes: () => void;
    ApiUpdateRecipe: (recipe: RecipeDto) => void;
    ApiDeleteRecipe: () => void;
    updatePortionSize: (updateBy: number) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(
    undefined
);

export const useRecipesContext = () => {
    const context = useContext(RecipeContext);
    if (!context)
        throw new Error('useRecipesContext must be used inside RecipeProvider');
    return context;
};
