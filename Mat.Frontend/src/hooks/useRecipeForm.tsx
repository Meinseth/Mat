import { useState } from 'react'
import type { RecipeDto } from '../services/ApiClient'
import { useRecipesContext } from '../context/recipe/useRecipeContext.ts'

const emptyForm: RecipeDto = {
    name: '',
    instructions: '',
    cookingTime: undefined,
    servings: undefined,
    ingredients: [],
}

export function useRecipeForm(onClose: () => void) {
    const [form, setForm] = useState<RecipeDto>(emptyForm)
    const { addRecipe } = useRecipesContext()

    const update = <Field extends keyof RecipeDto>(
        field: Field,
        value: RecipeDto[Field]
    ) => setForm((recipe) => ({ ...recipe, [field]: value }))

    const updateRecipe =
        (field: keyof RecipeDto) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            update(field, event.target.value)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        addRecipe(form)
        setForm(emptyForm)
        onClose()
    }

    return {
        form,
        update,
        updateRecipe,
        handleSubmit,
    }
}
