import styles from '../styles/styles.module.css';
import { useRecipesContext } from '../context/recipe/useRecipeContext.ts';
import { useModalContext } from '../context/modal/useModalContext.ts';

export default function RecipeList() {
    const { recipes, setSelectedRecipe } = useRecipesContext();
    const { openModal } = useModalContext();

    return (
        <>
            <div className={styles.recipeList}>
                {recipes.map((recipe, index) => (
                    <div
                        onClick={() => {
                            setSelectedRecipe(recipe);
                            openModal('viewRecipe');
                        }}
                        key={index}
                    >
                        {recipe.name}
                    </div>
                ))}
            </div>
        </>
    );
}
