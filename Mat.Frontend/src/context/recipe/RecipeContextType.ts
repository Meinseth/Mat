import type { RecipeDto } from 'src/services/ApiClient';

export interface RecipeContextType {
    recipes: RecipeDto[];
    setRecipes: React.Dispatch<React.SetStateAction<RecipeDto[]>>;
    selectedRecipe: RecipeDto | null;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<RecipeDto | null>>;
    addRecipe: (recipe: RecipeDto) => void;
    getRecipes: () => void;
    deleteRecipe: () => void;
    updatePorsionSize: (updateBy: number) => void;
}
