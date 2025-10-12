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
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};
