import { useEffect, useState } from "react";
import { ApiClient, type RecipeDto } from "../ApiClient.ts";
import AddRecipeModel from "./components/addRecipeModal.tsx";

function App() {
  const api = new ApiClient();

  const [recipes, setRecipes] = useState<RecipeDto[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api
      .getRecipes()
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAddRecipe = (recipe: RecipeDto) => {
    console.log("New recipe:", recipe);
    // Call your API here to save the recipe
  };

  return (
    <>
      <div></div>
      <h1>Mat</h1>
      <button className="button" onClick={() => setModalOpen(true)}>
        Add Recipe
      </button>
      <AddRecipeModel
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddRecipe}
      />
      {recipes?.map((recipe, index) => (
        <div key={index}>{recipe.name}</div>
      ))}
    </>
  );
}

export default App;
