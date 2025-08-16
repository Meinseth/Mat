import type { RecipeDto } from "src/services/ApiClient";
import styles from "src/styles/styles.module.css";

interface Props {
  recipes: RecipeDto[];
}

export default function recipeList(props: Props) {
  return (
    <>
      <div className={styles.recipeList}>
        {props.recipes?.map((recipe, index) => (
          <div key={index}>{recipe.name}</div>
        ))}
      </div>
    </>
  );
}
