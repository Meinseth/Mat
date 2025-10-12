import styles from '../styles/styles.module.css'
import { useRecipesContext } from '../context/recipeContext'
import { useModalContext } from '../context/modalContext'

export default function recipeList() {
    const { recipes, setSelectedRecipe } = useRecipesContext()
    const { openModal } = useModalContext()

    return (
        <>
            <div className={styles.recipeList}>
                {recipes.map((recipe, index) => (
                    <div
                        onClick={() => {
                            setSelectedRecipe(recipe)
                            openModal('viewRecipe')
                        }}
                        key={index}
                    >
                        {recipe.name}
                    </div>
                ))}
            </div>
        </>
    )
}
