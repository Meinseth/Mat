import Modal from "./modal";
import type { RecipeDto } from "../../services/ApiClient";
import styles from "../../styles/styles.module.css";

interface Props {
  recipe: RecipeDto | null;
  onClose: () => void;
}

export default function recipeModal({ recipe, onClose }: Props) {
  return (
    <Modal isOpen={!!recipe} onClose={onClose}>
      {recipe && (
        <>
          <h1>{recipe.name}</h1>

          <div className={styles.conteinerOuter}>
            <div className={styles.conteiner}>
              <h3>Ingredienser</h3>
              <div className={styles.IngredientRow}>
                <div>Porsjoner </div>
                <div>{recipe.servings}</div>
              </div>
              <hr />
              {recipe.ingredients?.map((ingredient, index) => (
                <div className={styles.IngredientRow} key={index}>
                  <div>{ingredient.name}</div>
                  <div>
                    {ingredient.amount}&nbsp;{ingredient.unit}
                  </div>
                </div>
              ))}

              <h3>Slik gjør du</h3>
              <div>{recipe.instructions}</div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
