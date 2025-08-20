import Modal from "./modal";
import type { RecipeDto } from "services/ApiClient";

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
          {recipe.ingredients?.map((ingredient, index) => (
            <div key={index}>
              <div>{ingredient.name}</div>
              <div>{ingredient.amount}</div>
              <div>{ingredient.unit}</div>
            </div>
          ))}
          <br />
          <div>{recipe.instructions}</div>
        </>
      )}
    </Modal>
  );
}
