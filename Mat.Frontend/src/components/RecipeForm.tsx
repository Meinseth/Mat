import { IngredientInputs } from './IngredientInputs';
import styles from '../styles/styles.module.css';
import { useRecipeForm } from '../hooks/useRecipeForm';
import type { RecipeDto } from 'src/services/ApiClient';
import { useEffect } from 'react';
import { useRecipesContext } from 'src/context/RecipeContext';
import AutoResizeTextarea from './AutoResizeTextarea';

export type FormType = 'Add' | 'Update';

interface props {
    title: string;
    closeModal: () => void;
    type: FormType;
    recipe?: RecipeDto;
}

export default function RecipeForm({ title, closeModal, type, recipe }: props) {
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
        <form onSubmit={type == 'Add' ? addSubmit : updateSubmit}>
            <h1 className={styles.modalTitle}>{title}</h1>
            <div className={styles.recipeInputs}>
                <div className={styles.titleLabel}>Tittel</div>
                <input
                    className={styles.titleInput}
                    required
                    placeholder="tittel"
                    value={form.name}
                    onChange={updateRecipe('name')}
                />
                <div className={styles.descLabel}>Beskrivelse</div>
                <AutoResizeTextarea
                    className={styles.descInput}
                    placeholder="beskrivelse"
                    value={form.instructions ?? ''}
                    onChange={updateRecipe('instructions')}
                    rows={3}
                />
                <div className={styles.timeLabel}>Tid</div>

                <div className={styles.servingsLabel}>Porsjoner</div>

                <div className={styles.timeInput}>
                    <input
                        type="number"
                        min="0"
                        value={
                            Math.floor((form.cookingTimeMinutes ?? 0) / 60) ||
                            ''
                        }
                        onChange={(e) => {
                            const hours = Number(e.target.value) || 0;
                            const minutes = (form.cookingTimeMinutes ?? 0) % 60;
                            updateRecipe('cookingTimeMinutes')(
                                hours * 60 + minutes
                            );
                        }}
                    />
                    {Math.floor((form.cookingTimeMinutes ?? 0) / 60) === 1
                        ? 'time'
                        : 'timer'}
                    <input
                        className={styles.timeInput}
                        type="number"
                        min="0"
                        max="59"
                        value={(form.cookingTimeMinutes ?? 0) % 60 || ''}
                        onChange={(e) => {
                            const minutes = Number(e.target.value) || 0;
                            const hours = Math.floor(
                                (form.cookingTimeMinutes ?? 0) / 60
                            );
                            updateRecipe('cookingTimeMinutes')(
                                hours * 60 + minutes
                            );
                        }}
                    />
                    {(form.cookingTimeMinutes ?? 0) % 60 === 1
                        ? 'minutt'
                        : 'minutter'}
                </div>
                <input
                    className={styles.servingsInput}
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
