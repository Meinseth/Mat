import React, { useState } from "react";
import type { RecipeDto } from "../../ApiClient";
import { IngredientInputs } from "./IngredientInputs";
import Modal from "./modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (recipe: RecipeDto) => void;
}

const emptyForm: RecipeDto = {
  name: "",
  instructions: "",
  cookingTime: undefined,
  servings: undefined,
  ingredients: [],
};

export default function AddRecipeModal(props: Props) {
  const [form, setForm] = useState<RecipeDto>(emptyForm);

  const update = <field extends keyof RecipeDto>(
    field: field,
    value: RecipeDto[field]
  ) => setForm((recipe) => ({ ...recipe, [field]: value }));

  const updateRecipe =
    (field: keyof RecipeDto) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      update(field, e.target.value);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    props.onAdd(form);

    setForm(emptyForm);

    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>

        <div className="recipe-inputs">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={updateRecipe("name")}
          />
          <textarea
            placeholder="Instructions"
            value={form.instructions}
            onChange={updateRecipe("instructions")}
            rows={3}
          />
          <input
            required
            placeholder="Cooking Time"
            type="number"
            value={form.cookingTime ?? ""}
            onChange={updateRecipe("cookingTime")}
          />
          <input
            required
            placeholder="Servings"
            type="number"
            value={form.servings ?? ""}
            onChange={updateRecipe("servings")}
          />
        </div>

        <IngredientInputs
          ingredients={form.ingredients ?? []}
          update={update}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" style={{ flexGrow: 1 }} type="submit">
            Add
          </button>
          <button
            className="button"
            style={{ flexGrow: 1 }}
            type="button"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
