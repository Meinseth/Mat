import type { RecipeDto } from "../../services/ApiClient";
import { IngredientInputs } from "../../components/IngredientInputs";
import Modal from "./modal";
import styles from "../../styles/styles.module.css";
import { useRecipeForm } from "../../hooks/useRecipeForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (recipe: RecipeDto) => void;
}

export default function AddRecipeModal(props: Props) {
  const { form, update, updateRecipe, handleSubmit } = useRecipeForm(
    props.onAdd,
    props.onClose
  );

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>

        <div className={styles.recipeInputs}>
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={updateRecipe("name")}
          />
          <textarea
            placeholder="Instructions"
            value={form.instructions}
            onChange={updateRecipe("instructions")}
            rows={3}
          />
          <input
            required
            placeholder="Cooking Time"
            type="number"
            value={form.cookingTime ?? ""}
            onChange={updateRecipe("cookingTime")}
          />
          <input
            required
            placeholder="Servings"
            type="number"
            value={form.servings ?? ""}
            onChange={updateRecipe("servings")}
          />
        </div>

        <IngredientInputs
          ingredients={form.ingredients ?? []}
          update={update}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className={styles.button}
            style={{ flexGrow: 1 }}
            type="submit"
          >
            Add
          </button>
          <button
            className={styles.button}
            style={{ flexGrow: 1 }}
            type="button"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
