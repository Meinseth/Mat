import { createContext, useContext, useEffect, useState } from "react";
import { ApiClient, type RecipeDto } from "../services/ApiClient";
import { ApiBaseUrl } from "../services/ApiBaseUrl";

interface RecipeContextType {
  recipes: RecipeDto[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeDto[]>>;
  selectedRecipe: RecipeDto | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<RecipeDto | null>>;
  addRecipe: (recipe: RecipeDto) => void;
  getRecipes: () => void;
  deleteRecipe: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeDto[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDto | null>(null);
  const api = new ApiClient(ApiBaseUrl);

  const addRecipe = (recipe: RecipeDto) => {
    api
      .postApiRecipe(recipe)
      .then((newRecipe) => setRecipes((recpies) => [...recpies, newRecipe]))
      .catch((error) => {
        console.error("error", error);
      });
  };

  const getRecipes = () => {
    api
      .getApiRecipes()
      .then((recipes) => setRecipes(recipes))
      .catch((error) => console.error("error", error));
  };

  const deleteRecipe = () => {
    if (!selectedRecipe) return;
    api
      .deleteApiRecipe(selectedRecipe.id!)
      .then(() => {
        setRecipes(
          recipes.filter((recipe) => recipe.id !== selectedRecipe?.id!)
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        selectedRecipe,
        setSelectedRecipe,
        addRecipe,
        getRecipes,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipesContext = () => {
  const context = useContext(RecipeContext);
  if (!context)
    throw new Error("useRecipesContext must be used inside RecipeProvider");
  return context;
};
