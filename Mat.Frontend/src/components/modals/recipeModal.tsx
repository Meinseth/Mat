import Modal from "./modal";
import styles from "../../styles/styles.module.css";
import { useModalContext } from "../../context/modalContext";
import { useRecipesContext } from "../../context/recipeContext";

export default function recipeModal() {
  const { activeModal, closeModal } = useModalContext();
  const { selectedRecipe, setSelectedRecipe, deleteRecipe } =
    useRecipesContext();
  const isOpen = activeModal === "viewRecipe";

  if (!isOpen || !selectedRecipe) return null;

  const onClose = () => {
    setSelectedRecipe(null);
    closeModal();
  };

  const onDelete = () => {
    deleteRecipe();
    setSelectedRecipe(null);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} onDelete={onDelete}>
      {selectedRecipe && (
        <>
          <h1>{selectedRecipe.name}</h1>
          <div className={styles.conteinerOuter}>
            <div className={styles.conteiner}>
              <div className={styles.IngredientRow}>
                <div>Tid </div>
                <div>{selectedRecipe.cookingTime}</div>
              </div>
              <div className={styles.IngredientRow}>
                <div>Porsjoner </div>
                <div>{selectedRecipe.servings}</div>
              </div>
              <h3>Ingredienser</h3>

              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <div className={styles.IngredientRow} key={index}>
                  <div>{ingredient.name}</div>
                  <div>
                    {ingredient.amount}&nbsp;{ingredient.unit}
                  </div>
                </div>
              ))}

              <h3>Slik gjør du</h3>
              <div>{selectedRecipe.instructions}</div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
