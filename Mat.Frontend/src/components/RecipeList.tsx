import styles from '../styles/styles.module.css';
import { useRecipesContext } from '../context/RecipeContext.ts';
import { useModalContext } from '../context/ModalContext.ts';

export default function RecipeList() {
    const { recipes, setSelectedRecipe, isLoading } = useRecipesContext();
    const { openModal } = useModalContext();

    return (
        <>
            {isLoading && <div>Loading...</div>}
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
