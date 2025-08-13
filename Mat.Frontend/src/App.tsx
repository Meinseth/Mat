import { useEffect, useState } from "react";
import { ApiClient, type RecipeDto } from "../ApiClient.ts";
import AddRecipeModal from "./components/addRecipeModal.tsx";
import RecipeList from "./components/recipeList.tsx";

export default function App() {
  const apiBaseUrl =
    process.env.NODE_ENV === "production"
      ? "http://backend:5000"
      : "http://localhost:5000";
  const api = new ApiClient(apiBaseUrl);

  const [recipes, setRecipes] = useState<RecipeDto[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api
      .getApiRecipes()
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleAddRecipe = (recipe: RecipeDto) => {
    api
      .postApiRecipe(recipe)
      .then((data) => console.log("success", data))
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <div></div>
      <h1>Mat</h1>
      <button className="button" onClick={() => setModalOpen(true)}>
        Add Recipe
      </button>
      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddRecipe}
      />
      <RecipeList recipes={recipes} />
    </>
  );
}
