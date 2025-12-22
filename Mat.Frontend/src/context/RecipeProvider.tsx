import { useCallback, useState } from 'react';
import { ApiClient, type RecipeDto } from '../services/ApiClient';
import { RecipeContext } from './RecipeContext';
import { toast } from 'sonner';
import { handleApiAsync } from './ContextHelper';

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const api = new ApiClient('', {
        fetch: (input, init) => {
            return window.fetch(input, {
                ...init,
                credentials: 'include',
            });
        },
    });

    const ApiGetRecipes = useCallback(async (): Promise<RecipeDto[] | null> => {
        return handleApiAsync(setIsLoading, async () => {
            const recipes = await api.getApiRecipesAll();
            setRecipes(recipes);
            return recipes;
        });
    }, []);

    const ApiAddRecipe = useCallback(
        async (recipe: RecipeDto): Promise<RecipeDto | null> => {
            return await handleApiAsync(setIsLoading, async () => {
                const newRecipe = await api.postApiRecipes(recipe);
                setRecipes((prev) => [...prev, newRecipe]);
                toast.success('Recipe added successfully!');
                return newRecipe;
            });
        },
        []
    );

    const ApiUpdateRecipe = useCallback(
        async (recipe: RecipeDto): Promise<RecipeDto | null> => {
            return await handleApiAsync(setIsLoading, async () => {
                if (!recipe.id) return null;
                const updatedRecipe = await api.putApiRecipes(
                    recipe.id,
                    recipe
                );
                setRecipes((prev) =>
                    prev.map((r) =>
                        r.id === updatedRecipe.id ? updatedRecipe : r
                    )
                );
                toast.success('Recipe updated!');
                return updatedRecipe;
            });
        },
        []
    );

    const ApiDeleteRecipe = useCallback(async (): Promise<boolean | null> => {
        return await handleApiAsync(setIsLoading, async () => {
            if (!selectedRecipe?.id) return null;
            await api.deleteApiRecipes(selectedRecipe.id);
            setRecipes((prev) =>
                prev.filter((recipe) => recipe.id !== selectedRecipe.id)
            );
            setSelectedRecipe(null);
            toast.success('Recipe deleted!');
            return true;
        });
    }, [selectedRecipe]);

    const updatePortionSize = useCallback(
        (updateBy: number) => {
            if (!selectedRecipe || selectedRecipe.servings == undefined) return;

            const oldServings = selectedRecipe.servings;
            const newServings = oldServings + updateBy;

            if (newServings < 1) return;

            const multiplier = newServings / oldServings;

            const updatedRecipe = {
                ...selectedRecipe,
                servings: newServings,
                ingredients: selectedRecipe.ingredients?.map((ingredient) => ({
                    ...ingredient,
                    amount: ingredient.amount
                        ? ingredient.amount * multiplier
                        : ingredient.amount,
                })),
            };

            setSelectedRecipe(updatedRecipe);
        },
        [selectedRecipe, setSelectedRecipe]
    );

    return (
        <RecipeContext.Provider
            value={{
                isLoading,
                recipes,
                setRecipes,
                selectedRecipe,
                setSelectedRecipe,
                ApiAddRecipe,
                ApiGetRecipes,
                ApiUpdateRecipe,
                ApiDeleteRecipe,
                updatePortionSize,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};
