import { useCallback, useState } from 'react';
import type { RecipeDto } from '../services/ApiClient';
import { useRecipesContext } from '../context/RecipeContext.ts';

const emptyForm: RecipeDto = {
    name: '',
    instructions: '',
    cookingTime: undefined,
    servings: undefined,
    ingredients: [],
};

export function useRecipeForm(onClose: () => void) {
    const [form, setForm] = useState<RecipeDto>(emptyForm);
    const { ApiAddRecipe, ApiUpdateRecipe, setSelectedRecipe } =
        useRecipesContext();

    const update = useCallback(
        <T extends keyof RecipeDto>(field: T, value: RecipeDto[T]) =>
            setForm((recipe) => ({ ...recipe, [field]: value })),
        []
    );

    const updateRecipe = useCallback(
        (field: keyof RecipeDto) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
                update(field, event.target.value),
        [update]
    );

    const addSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const addedRecipe = await ApiAddRecipe(form);
        if (addedRecipe) {
            setForm(emptyForm);
            onClose();
        }
    };

    const updateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updateRecipe = await ApiUpdateRecipe(form);
        if (updateRecipe) {
            setSelectedRecipe(updateRecipe);
            onClose();
        }
    };

    return {
        form,
        setForm,
        update,
        updateRecipe,
        addSubmit,
        updateSubmit,
    };
}
