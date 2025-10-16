import { useCallback, useState } from 'react';
import { ApiClient, type RecipeDto } from '../../services/ApiClient';
import { ApiBaseUrl } from '../../services/ApiBaseUrl';
import { RecipeContext } from './RecipeContext';

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(
        null
    );
    const api = new ApiClient(ApiBaseUrl, {
        fetch: (input, init) => {
            return window.fetch(input, {
                ...init,
                credentials: 'include',
            });
        },
    });

    const addRecipe = useCallback((recipe: RecipeDto) => {
        api.postApiRecipe(recipe)
            .then((newRecipe) =>
                setRecipes((recpies) => [...recpies, newRecipe])
            )
            .catch((error) => {
                console.error('error', error);
            });
    }, []);

    const getRecipes = useCallback(() => {
        api.getApiRecipes()
            .then((recipes) => setRecipes(recipes))
            .catch((error) => console.error('error', error));
    }, []);

    const deleteRecipe = useCallback(() => {
        if (!selectedRecipe || !selectedRecipe.id) return;
        api.deleteApiRecipe(selectedRecipe.id)
            .then(() => {
                setRecipes(
                    recipes.filter((recipe) => recipe.id !== selectedRecipe.id)
                );
            })
            .catch((error) => console.error('Fetch error:', error));
    }, []);

    const updatePorsionSize = useCallback(
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
                recipes,
                setRecipes,
                selectedRecipe,
                setSelectedRecipe,
                addRecipe,
                getRecipes,
                deleteRecipe,
                updatePorsionSize,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};
