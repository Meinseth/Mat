import { useEffect, useState } from "react";
import AddRecipeModal from "./modals/addRecipeModal.tsx";
import RecipeList from "./components/recipeList.tsx";
import { Plus } from "lucide-react";
import styles from "./styles/styles.module.css";
import { useRecipesContext } from "./context/recipeContext.tsx";
import { useModalContext } from "./context/modalContext.tsx";
import RecipeModal from "./modals/viewRecipeModal.tsx";
import userManager from "./services/authService.ts";

export default function App() {
  const { getRecipes } = useRecipesContext();
  const { openModal } = useModalContext();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  function LoginButton() {
    return (
      <button onClick={async () => await userManager.signinRedirect()}>
        Login
      </button>
    );
  }

  function LogoutButton() {
    return (
      <button
        onClick={async () => {
          await userManager.removeUser();

          localStorage.removeItem("token");

          setToken(null);

          window.location.reload();
        }}
      >
        Logout
      </button>
    );
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      {!token && <LoginButton />}
      {token && (
        <>
          <div className={styles.topBar}>
            <button
              className={styles.invisibleButton}
              onClick={() => openModal("addRecipe")}
            >
              <Plus size={30} />
            </button>
            <LogoutButton />
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
