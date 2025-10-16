import { IngredientInputs } from '../components/IngredientInputs';
import Modal from './modal';
import styles from '../styles/styles.module.css';
import { useRecipeForm } from '../hooks/useRecipeForm';
import { useModalContext } from '../context/modal/useModalContext';

export default function AddRecipeModal() {
    const { activeModal, closeModal } = useModalContext();
    const isOpen = activeModal === 'addRecipe';
    const { form, update, updateRecipe, handleSubmit } =
        useRecipeForm(closeModal);
    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit} className={styles.recipeCenter}>
                <h1 className={styles.modalTitle}>Add Recipe</h1>
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
                        value={form.cookingTime ?? ''}
                        onChange={updateRecipe('cookingTime')}
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
                        Add
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
        </Modal>
    );
}
