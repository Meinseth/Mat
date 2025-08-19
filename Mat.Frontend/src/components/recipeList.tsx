import { useState } from "react";
import type { RecipeDto } from "src/services/ApiClient";
import styles from "src/styles/styles.module.css";
import RecipeModal from "./modals/recipeModal";

interface Props {
  recipes: RecipeDto[];
}

export default function recipeList(props: Props) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(null);

  return (
    <>
      <div className={styles.recipeList}>
        {props.recipes?.map((recipe, index) => (
          <div
            className={styles.recipe}
            onClick={() => {
              setSelectedRecipe(recipe);
              console.log(selectedRecipe);
            }}
            key={index}
          >
            {recipe.name}
          </div>
        ))}
      </div>
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  );
}
