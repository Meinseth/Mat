import { useEffect } from "react";
import AddRecipeModal from "./modals/addRecipeModal.tsx";
import RecipeList from "./components/recipeList.tsx";
import { Plus } from "lucide-react";
import styles from "./styles/styles.module.css";
import { useRecipesContext } from "./context/recipeContext.tsx";
import { useModalContext } from "./context/modalContext.tsx";
import RecipeModal from "./modals/viewRecipeModal.tsx";

export default function App() {
  const { getRecipes } = useRecipesContext();

  const { openModal } = useModalContext();

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <div className={styles.topBar}>
        <button
          className={styles.invisibleButton}
          onClick={() => openModal("addRecipe")}
        >
          <Plus size={30} />
        </button>
      </div>
      <div className={styles.content}>
        <h1>Mat</h1>
        <RecipeList />
      </div>
      <AddRecipeModal />
      <RecipeModal />
    </>
  );
}
