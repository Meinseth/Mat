import { useState } from "react";
import type { RecipeDto } from "../services/ApiClient";
import styles from "../styles/styles.module.css";
import RecipeModal from "../components/modals/recipeModal";

interface Props {
  recipes: RecipeDto[];
}

export default function recipeList(props: Props) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(null);

  return (
    <>
      <div className={styles.recipeList}>
        {props.recipes?.map((recipe, index) => (
          <div onClick={() => setSelectedRecipe(recipe)} key={index}>
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
