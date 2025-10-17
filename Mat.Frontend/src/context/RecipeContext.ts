import { createContext } from 'react';
import type { RecipeDto } from 'src/services/ApiClient';
import { useContext } from 'react';

export interface RecipeContextType {
    isLoading: boolean;
    recipes: RecipeDto[];
    setRecipes: React.Dispatch<React.SetStateAction<RecipeDto[]>>;
    selectedRecipe: RecipeDto | null;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<RecipeDto | null>>;
    ApiGetRecipes: () => Promise<RecipeDto[] | null>;
    ApiAddRecipe: (recipe: RecipeDto) => Promise<RecipeDto | null>;
    ApiUpdateRecipe: (recipe: RecipeDto) => Promise<RecipeDto | null>;
    ApiDeleteRecipe: () => Promise<boolean | null>;
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
