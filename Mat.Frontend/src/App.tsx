import AddRecipeModal from "./modals/addRecipeModal.tsx";
import RecipeList from "./components/recipeList.tsx";
import { Plus } from "lucide-react";
import styles from "./styles/styles.module.css";
import { useModalContext } from "./context/modalContext.tsx";
import RecipeModal from "./modals/viewRecipeModal.tsx";
import { useAuthContext } from "./context/AuthContext.tsx";
import { useEffect } from "react";
import { useRecipesContext } from "./context/recipeContext.tsx";

export default function App() {
  const { getRecipes } = useRecipesContext();
  const { openModal } = useModalContext();
  const { user, login, logout } = useAuthContext();

  useEffect(() => {
    if (user) getRecipes();
  }, [user]);

  return (
    <>
      {!user && <button onClick={login}>Login</button>}
      {user && (
        <>
          <div className={styles.topBar}>
            <button
              className={styles.invisibleButton}
              onClick={() => openModal("addRecipe")}
            >
              <Plus size={30} />
            </button>
            <button onClick={logout}>Logout</button>
          </div>
          <div className={styles.content}>
            <h1>Mat</h1>
            <RecipeList />
          </div>
          <AddRecipeModal />
          <RecipeModal />
        </>
      )}
    </>
  );
}
