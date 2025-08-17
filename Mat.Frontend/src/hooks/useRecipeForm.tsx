import { useState } from "react";
import type { RecipeDto } from "src/services/ApiClient";

const emptyForm: RecipeDto = {
  name: "",
  instructions: "",
  cookingTime: undefined,
  servings: undefined,
  ingredients: [],
};

export function useRecipeForm(
  onAdd: (recipe: RecipeDto) => void,
  onClose: () => void
) {
  const [form, setForm] = useState<RecipeDto>(emptyForm);

  const update = <Field extends keyof RecipeDto>(
    field: Field,
    value: RecipeDto[Field]
  ) => setForm((recipe) => ({ ...recipe, [field]: value }));

  const updateRecipe =
    (field: keyof RecipeDto) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(field, event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(form);
    setForm(emptyForm);
    onClose();
  };

  return {
    form,
    update,
    updateRecipe,
    handleSubmit,
  };
}
