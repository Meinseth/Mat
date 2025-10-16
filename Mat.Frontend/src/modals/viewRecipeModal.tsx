import Modal from './modal';
import styles from '../styles/styles.module.css';
import { useModalContext } from '../context/modal/useModalContext.ts';
import { useRecipesContext } from '../context/recipe/useRecipeContext.ts';
import type { IngredientDto } from '../services/ApiClient';
import ConfirmDeleteModal from './confirmDeleteModal';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function ViewRecipeModal() {
    const { activeModal, closeModal } = useModalContext();
    const {
        selectedRecipe,
        setSelectedRecipe,
        deleteRecipe,
        updatePorsionSize,
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
                {ingredient.unit}
            </dd>
        </div>
    );

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
                }}
                onDelete={() => setShowConfirm(true)}
                onEdit={() => {
                    setIsEdit((prev) => !prev);
                    return isEdit;
                }}
            >
                <div className={styles.recipeGrid}>
                    <h1 className={styles.modalTitle}>{selectedRecipe.name}</h1>
                    <Row
                        label={'Tid'}
                        value={
                            selectedRecipe.cookingTime?.toString() + ' minutes'
                        }
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
                                onClick={() => updatePorsionSize(+1)}
                            >
                                <Plus size={16} />
                            </button>
                            <button
                                className={styles.button}
                                onClick={() => updatePorsionSize(-1)}
                            >
                                <Minus size={16} />
                            </button>
                        </dd>
                    </div>
                    <h3>Ingredienser</h3>
                    {selectedRecipe.ingredients?.map((ingredient, index) => (
                        <IngredientRow key={index} ingredient={ingredient} />
                    ))}

                    <h3>Slik gjør du</h3>
                    <div>{selectedRecipe.instructions}</div>
                </div>
            </Modal>
            <ConfirmDeleteModal
                isOpen={showConfirm}
                type="Recipe"
                name={selectedRecipe.name}
                onClose={() => setShowConfirm(false)}
                onSuccess={() => {
                    deleteRecipe();
                    setSelectedRecipe(null);
                }}
            />
        </>
    );
}
