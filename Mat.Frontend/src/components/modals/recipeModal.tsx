import Modal from "./modal";
import { ApiClient, type RecipeDto } from "../../services/ApiClient";
import styles from "../../styles/styles.module.css";
import { ApiBaseUrl } from "../../services/ApiBaseUrl";

interface Props {
  recipe: RecipeDto | undefined;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function recipeModal({ recipe, onClose, onDelete }: Props) {
  const api = new ApiClient(ApiBaseUrl);

  const handleDelete = () => {
    api
      .deleteApiRecipe(recipe?.id!)
      .then(() => {
        onDelete(recipe?.id!);
        onClose();
        console.log("delete id:", recipe?.id);
      })
      .catch((error) => console.error("Fetch error:", error));
  };
  return (
    <Modal isOpen={!!recipe} onClose={onClose} onDelete={handleDelete}>
      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <div className={styles.conteinerOuter}>
            <div className={styles.conteiner}>
              <div className={styles.IngredientRow}>
                <div>Tid </div>
                <div>{recipe.cookingTime}</div>
              </div>
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
