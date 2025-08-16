import React, { useState } from "react";
import type { RecipeDto } from "src/services/ApiClient";
import { IngredientInputs } from "src/components/IngredientInputs";
import Modal from "./modal";
import styles from "src/styles/styles.module.css";

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
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) =>
      update(field, event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    props.onAdd(form);

    setForm(emptyForm);

    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>

        <div className={styles.recipeInputs}>
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
          <button
            className={styles.button}
            style={{ flexGrow: 1 }}
            type="submit"
          >
            Add
          </button>
          <button
            className={styles.button}
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
