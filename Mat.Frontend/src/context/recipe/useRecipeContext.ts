import { useContext } from 'react'

import { RecipeContext } from './RecipeContext'
export const useRecipesContext = () => {
    const context = useContext(RecipeContext)
    if (!context)
        throw new Error('useRecipesContext must be used inside RecipeProvider')
    return context
}
