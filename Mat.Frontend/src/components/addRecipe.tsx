import React, { useState } from "react";
import type { IngredientDto, RecipeDto } from "../../ApiClient";
import { IngredientInputs } from "./IngredientInputs";
import Modal from "./modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (recipe: RecipeDto) => void;
}

const AddRecipeModel: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState<RecipeDto>({
    name: "",
    instructions: "",
    cookingTime: undefined,
    servings: undefined,
    ingredients: [],
  });

  const update = (field: keyof RecipeDto, value: any) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleIngredientChange = (
    i: number,
    field: keyof IngredientDto,
    value: string | number
  ) => {
    const ing = [...(form.ingredients ?? [])];
    ing[i] = { ...ing[i], [field]: value };
    update("ingredients", ing);
  };

  const addIngredient = () =>
    update("ingredients", [
      ...(form.ingredients ?? []),
      { name: "", amount: 0, unit: 0 },
    ]);

  const removeIngredient = (i: number) =>
    update(
      "ingredients",
      form.ingredients?.filter((_, idx) => idx !== i) ?? []
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      name: "",
      instructions: "",
      cookingTime: undefined,
      servings: undefined,
      ingredients: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>

        <div className="recipe-inputs">
          <input
            placeholder="Name"
            value={form.name ?? ""}
            onChange={(e) => update("name", e.target.value)}
          />
          <textarea
            placeholder="Instructions"
            value={form.instructions ?? ""}
            onChange={(e) => update("instructions", e.target.value)}
            rows={3}
          />
          <input
            placeholder="Cooking Time"
            type="number"
            value={form.cookingTime ?? ""}
            onChange={(e) => update("cookingTime", Number(e.target.value))}
          />
          <input
            placeholder="Servings"
            type="number"
            value={form.servings ?? ""}
            onChange={(e) => update("servings", Number(e.target.value))}
          />
        </div>

        <IngredientInputs
          ingredients={form.ingredients ?? []}
          onChange={handleIngredientChange}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" style={{ flexGrow: 1 }} type="submit">
            Add
          </button>
          <button
            className="button"
            style={{ flexGrow: 1 }}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRecipeModel;
