import { IngredientInputs } from '../components/IngredientInputs';
import styles from '../styles/styles.module.css';
import { useRecipeForm } from '../hooks/useRecipeForm';
import type { RecipeDto } from 'src/services/ApiClient';
import { useEffect } from 'react';
import { useRecipesContext } from 'src/context/RecipeContext';

export type FormType = 'Add' | 'Update';

interface props {
    title: string;
    closeModal: () => void;
    type: FormType;
    recipe?: RecipeDto;
}

export default function recipeForm({ title, closeModal, type, recipe }: props) {
    const { form, update, updateRecipe, addSubmit, updateSubmit, setForm } =
        useRecipeForm(closeModal);
    const { isLoading } = useRecipesContext();

    useEffect(() => {
        if (type === 'Update') {
            if (recipe) setForm(recipe);
            else console.error('Type "Update" requires a recipe');
        }
    }, [type, recipe, setForm]);

    if (isLoading) return <>Loading</>;
    return (
        <form
            onSubmit={type == 'Add' ? addSubmit : updateSubmit}
            className={styles.recipeCenter}
        >
            <h1 className={styles.modalTitle}>{title}</h1>
            <div className={styles.recipeInputs}>
                <input
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={updateRecipe('name')}
                />
                <textarea
                    placeholder="Instructions"
                    value={form.instructions}
                    onChange={updateRecipe('instructions')}
                    rows={3}
                />
                <input
                    required
                    placeholder="Cooking Time"
                    type="number"
                    value={form.cookingTimeMinutes ?? ''}
                    onChange={updateRecipe('cookingTimeMinutes')}
                />
                <input
                    required
                    placeholder="Servings"
                    type="number"
                    value={form.servings ?? ''}
                    onChange={updateRecipe('servings')}
                />
            </div>

            <IngredientInputs
                ingredients={form.ingredients ?? []}
                update={update}
            />
            <div className={styles.strechButtons}>
                <button className={styles.button} type="submit">
                    {type == 'Add' ? 'Legg til' : 'Lagre'}
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
