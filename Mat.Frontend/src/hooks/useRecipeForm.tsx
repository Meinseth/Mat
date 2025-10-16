import { useState } from 'react';
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

    const update = <T extends keyof RecipeDto>(field: T, value: RecipeDto[T]) =>
        setForm((recipe) => ({ ...recipe, [field]: value }));

    const updateRecipe =
        (field: keyof RecipeDto) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            update(field, event.target.value);

    const addSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        ApiAddRecipe(form);
        setForm(emptyForm);
        onClose();
    };

    const updateSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        ApiUpdateRecipe(form);
        setSelectedRecipe(form);
        onClose();
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
