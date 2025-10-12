import type { IngredientDto, RecipeDto } from '../services/ApiClient'
import { X } from 'lucide-react'
import styles from '../styles/styles.module.css'
import { useIngredients } from '../hooks/useIngredients'

interface Props {
    ingredients: IngredientDto[]
    update: (field: keyof RecipeDto, value: IngredientDto[]) => void
}

export function IngredientInputs(props: Props) {
    const {
        ingredients,
        unitOptions,
        updateIngredient,
        addIngredient,
        removeIngredient,
    } = useIngredients(props.ingredients, props.update)

    return (
        <>
            <button
                className={styles.button}
                style={{ margin: '1rem 0 1rem 0' }}
                type="button"
                onClick={addIngredient}
            >
                Add Ingredient
            </button>
            <div className={styles.ingredientList}>
                {ingredients.map((ingredient, index) => (
                    <div className={styles.ingredientInputs} key={index}>
                        <input
                            required
                            placeholder="Name"
                            value={ingredient.name ?? ''}
                            onChange={updateIngredient(index, 'name')}
                        />
                        <input
                            required
                            placeholder="Amount"
                            type="number"
                            value={ingredient.amount ?? ''}
                            onChange={updateIngredient(index, 'amount')}
                        />
                        <select
                            value={ingredient.unit}
                            onChange={updateIngredient(index, 'unit')}
                        >
                            {unitOptions.map((unitOption) => (
                                <option key={unitOption} value={unitOption}>
                                    {unitOption}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                        >
                            <X size="16" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
