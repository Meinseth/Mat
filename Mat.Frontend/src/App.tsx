import { useEffect, useState } from "react";
import { ApiClient, type RecipeDto } from "./services/ApiClient.ts";
import AddRecipeModal from "./components/modals/addRecipeModal.tsx";
import RecipeList from "./components/recipeList.tsx";
import { API_BASE_URL } from "./services/ApiBaseUrl.ts";
import { Plus } from "lucide-react";
import styles from "./styles/styles.module.css";

export default function App() {
  const api = new ApiClient(API_BASE_URL);

  const [recipes, setRecipes] = useState<RecipeDto[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getApiRecipes();
  }, []);

  const getApiRecipes = () => {
    api
      .getApiRecipes()
      .then((recipes) => setRecipes(recipes))
      .catch((error) => console.error("Fetch error:", error));
  };

  const handleAddRecipe = (recipe: RecipeDto) => {
    api
      .postApiRecipe(recipe)
      .then((newRecipe) => setRecipes((recpies) => [...recpies, newRecipe]))
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <div className={styles.topBar}>
        <button
          className={styles.invisibleButton}
          onClick={() => setModalOpen(true)}
        >
          <Plus size={30} />
        </button>
      </div>
      <div className={styles.content}>
        <h1>Mat</h1>

        <AddRecipeModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddRecipe}
        />
        <RecipeList recipes={recipes} />
      </div>
    </>
  );
}
