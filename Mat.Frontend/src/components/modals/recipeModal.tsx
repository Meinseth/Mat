import Modal from "./modal";
import styles from "../../styles/styles.module.css";
import { useModalContext } from "../../context/modalContext";
import { useRecipesContext } from "../../context/recipeContext";
import type { IngredientDto } from "../../services/ApiClient";

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

  const IngredientRow = ({ ingredient }: { ingredient: IngredientDto }) => (
    <div className={styles.IngredientRow}>
      <dt>{ingredient.name}</dt>
      <dd>
        {ingredient.amount} {ingredient.unit}
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
        <dd>{value ?? ""}</dd>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onDelete={onDelete}>
      {selectedRecipe && (
        <>
          <h1>{selectedRecipe.name}</h1>
          <div className={styles.conteinerOuter}>
            <div className={styles.conteiner}>
              <Row
                label={"Tid"}
                value={selectedRecipe.cookingTime?.toString()}
              />
              <Row
                label={"Porsjoner"}
                value={selectedRecipe.servings?.toString()}
              />
              <h3>Ingredienser</h3>
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <IngredientRow key={index} ingredient={ingredient} />
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
