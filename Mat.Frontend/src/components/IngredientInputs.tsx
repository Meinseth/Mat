import type { Unit, IngredientDto, RecipeDto } from "../../ApiClient";
import { X } from "lucide-react";

interface Props {
  ingredients: IngredientDto[];
  update: (field: keyof RecipeDto, value: IngredientDto[]) => void;
}

export function IngredientInputs(props: Props) {
  const unitOptions = [
    "Gram",
    "Kilogram",
    "Milliliter",
    "Desiliter",
    "Liter",
  ] as const satisfies readonly Unit[];

  const updateIngredient =
    (index: number, field: keyof IngredientDto) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const ingredients = [...(props.ingredients ?? [])];
      ingredients[index] = {
        ...ingredients[index],
        [field]: event.target.value,
      };
      props.update("ingredients", ingredients);
    };

  const addIngredient = () =>
    props.update("ingredients", [
      ...(props.ingredients ?? []),
      { name: "", amount: undefined, unit: "Gram" },
    ]);

  const removeIngredient = (idToRemove: number) =>
    props.update(
      "ingredients",
      props.ingredients?.filter((_, id) => id !== idToRemove) ?? []
    );

  return (
    <>
      <button className="button" type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
      {props.ingredients.map((ingredient, index) => (
        <div className="ingredient-inputs" key={index}>
          <input
            required
            placeholder="Name"
            value={ingredient.name ?? ""}
            onChange={updateIngredient(index, "name")}
          />
          <input
            required
            placeholder="Amount"
            type="number"
            value={ingredient.amount ?? ""}
            onChange={updateIngredient(index, "amount")}
          />
          <select
            value={ingredient.unit}
            onChange={updateIngredient(index, "unit")}
          >
            {unitOptions.map((unitOption) => (
              <option key={unitOption} value={unitOption}>
                {unitOption}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => removeIngredient(index)}>
            <X size="16" />
          </button>
        </div>
      ))}
    </>
  );
}
