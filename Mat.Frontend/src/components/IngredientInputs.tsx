import React from "react";
import type { Unit, IngredientDto } from "../../ApiClient";

interface Props {
  ingredients: IngredientDto[];
  onChange: (
    index: number,
    field: keyof IngredientDto,
    value: string | number
  ) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const IngredientInputs: React.FC<Props> = ({
  ingredients,
  onChange,
  onAdd,
  onRemove,
}) => {
  const MyUnit = {
    Gram: "Gram",
    Kilogram: "Kilogram",
    Milliliter: "Milliliter",
    Desiliter: "Desiliter",
    Liter: "Liter",
  } as const;

  const unitOptions: { label: string; value: Unit }[] = Object.keys(MyUnit).map(
    (key) => ({
      label: key,
      value: key as Unit,
    })
  );

  return (
    <div>
      <h4>Ingredients</h4>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            placeholder="Name"
            value={ingredient.name ?? ""}
            onChange={(e) => onChange(index, "name", e.target.value)}
          />
          <input
            placeholder="Amount"
            type="number"
            value={ingredient.amount ?? ""}
            onChange={(e) => onChange(index, "amount", Number(e.target.value))}
          />
          <select
            value={ingredient.unit ?? 0}
            onChange={(e) => onChange(index, "unit", Number(e.target.value))}
          >
            {unitOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => onRemove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={onAdd}>
        Add Ingredient
      </button>
    </div>
  );
};
