import { useCallback } from "react";
import type { Unit, IngredientDto, RecipeDto } from "services/ApiClient";

export function useIngredients(
  ingredients: IngredientDto[] = [],
  update: (field: keyof RecipeDto, value: IngredientDto[]) => void
) {
  const unitOptions = [
    "Gram",
    "Kilogram",
    "Milliliter",
    "Desiliter",
    "Liter",
  ] as const satisfies readonly Unit[];

  const setIngredients = useCallback(
    (next: IngredientDto[]) => update("ingredients", next),
    [update]
  );

  const updateIngredient = useCallback(
    (index: number, field: keyof IngredientDto) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value =
          field === "amount" ? Number(event.target.value) : event.target.value;

        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setIngredients(newIngredients);
      },
    [ingredients, setIngredients]
  );

  const addIngredient = useCallback(() => {
    setIngredients([
      ...ingredients,
      { name: "", amount: undefined, unit: "Gram" },
    ]);
  }, [ingredients, setIngredients]);

  const removeIngredient = useCallback(
    (idToRemove: number) => {
      setIngredients(ingredients.filter((_, i) => i !== idToRemove));
    },
    [ingredients, setIngredients]
  );

  return {
    ingredients,
    unitOptions,
    updateIngredient,
    addIngredient,
    removeIngredient,
  };
}
