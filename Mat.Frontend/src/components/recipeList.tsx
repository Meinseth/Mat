import type { RecipeDto } from "../../ApiClient";
import styles from "../styles.module.css";

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
