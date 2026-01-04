import Modal from './Modal.tsx';
import styles from '../styles/styles.module.css';
import { useModalContext } from '../context/ModalContext.ts';
import { useRecipesContext } from '../context/RecipeContext.ts';
import type { IngredientDto } from '../services/ApiClient.ts';
import ConfirmDeleteModal from './ConfirmDeleteModal.tsx';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import RecipeForm from 'src/components/RecipeForm.tsx';
import { UnitLabel } from 'src/components/UnitLabel.tsx';

export default function ViewRecipeModal() {
    const { activeModal, closeModal } = useModalContext();
    const {
        selectedRecipe,
        setSelectedRecipe,
        ApiDeleteRecipe,
        updatePortionSize,
    } = useRecipesContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const isOpen = activeModal === 'viewRecipe';
    const [isEdit, setIsEdit] = useState(false);

    if (!selectedRecipe) return null;

    const IngredientRow = ({ ingredient }: { ingredient: IngredientDto }) => (
        <div className={styles.IngredientRow}>
            <dt>{ingredient.name}</dt>
            <dd>
                {ingredient.amount?.toFixed(1).replace(/\.0$/, '')}{' '}
                <UnitLabel
                    unit={ingredient?.unit}
                    amount={ingredient?.amount}
                />
            </dd>
        </div>
    );

    function formatCookingTime(totalMinutes?: number) {
        if (totalMinutes == null || totalMinutes == 0) return 'Mangler tid';

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const result: string[] = [];

        if (hours > 0) {
            result.push(`${hours} ${hours === 1 ? 'time' : 'timer'}`);
        }

        if (minutes > 0) {
            result.push(`${minutes} ${minutes === 1 ? 'minutt' : 'minutter'}`);
        }
        console.log(result);
        return result.join(' og ');
    }

    const Row = ({
        label,
        value,
    }: {
        label: string;
        value: string | undefined;
    }) => {
        return (
            <div className={styles.IngredientRow}>
                <dt>{label}</dt>
                <dd>{value ?? ''}</dd>
            </div>
        );
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setSelectedRecipe(null);
                    closeModal();
                    setIsEdit(false);
                }}
                onDelete={() => setShowConfirm(true)}
                isEdit={isEdit}
                onEdit={() => setIsEdit((prev) => !prev)}
            >
                {isEdit ? (
                    <RecipeForm
                        title="Endre oppskrift"
                        type="Update"
                        recipe={selectedRecipe}
                        closeModal={() => setIsEdit((prev) => !prev)}
                    />
                ) : (
                    <div className={styles.recipeGrid}>
                        <h1 className={styles.modalTitle}>
                            {selectedRecipe.name}
                        </h1>
                        <Row
                            label={'Tid'}
                            value={formatCookingTime(
                                selectedRecipe.cookingTimeMinutes
                            )}
                        />
                        <Row
                            label={'Porsjoner'}
                            value={selectedRecipe.servings?.toString()}
                        />
                        <div className={styles.IngredientRow}>
                            <dt>Endre størrelse</dt>
                            <dd className={styles.changeSize}>
                                <button
                                    className={styles.button}
                                    onClick={() => updatePortionSize(+1)}
                                >
                                    <Plus size={16} />
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={() => updatePortionSize(-1)}
                                >
                                    <Minus size={16} />
                                </button>
                            </dd>
                        </div>
                        <h3>Ingredienser</h3>
                        {selectedRecipe.ingredients?.map(
                            (ingredient, index) => (
                                <IngredientRow
                                    key={index}
                                    ingredient={ingredient}
                                />
                            )
                        )}

                        <h3>Slik gjør du</h3>
                        <div className={styles.recipeInstructions}>
                            {selectedRecipe.instructions}
                        </div>
                    </div>
                )}
            </Modal>
            <ConfirmDeleteModal
                isOpen={showConfirm}
                type="Recipe"
                name={selectedRecipe.name}
                onClose={() => setShowConfirm(false)}
                onSuccess={() => {
                    ApiDeleteRecipe();
                    setSelectedRecipe(null);
                }}
            />
        </>
    );
}
