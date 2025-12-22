import RecipeList from '../components/RecipeList';
import styles from '../styles/styles.module.css';
import { useRecipesContext } from 'src/context/RecipeContext';
import { useEffect } from 'react';

export default function FrontPage() {
    const { recipes, ApiGetRecipes } = useRecipesContext();

    useEffect(() => {
        if (recipes.length == 0) ApiGetRecipes();
    }, [recipes, ApiGetRecipes]);

    return (
        <div className={styles.content}>
            <h1>Mat</h1>
            <RecipeList />
        </div>
    );
}
