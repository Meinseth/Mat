import AddRecipeModal from './modals/AddRecipeModal.tsx';
import RecipeList from './components/RecipeList.tsx';
import { Plus, User } from 'lucide-react';
import styles from './styles/styles.module.css';
import { useModalContext } from './context/ModalContext.ts';
import RecipeModal from './modals/ViewRecipeModal.tsx';
import { useAuthContext } from './context/AuthContext.ts';
import { useEffect } from 'react';
import { useRecipesContext } from './context/RecipeContext.ts';
import { Dropdown } from './components/dropdown/Dropdown.tsx';
import useTheme from './hooks/useTheme.tsx';

export default function App() {
    const { ApiGetRecipes } = useRecipesContext();
    const { openModal } = useModalContext();
    const { user, login, logout, loading } = useAuthContext();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (user) ApiGetRecipes();
    }, [user, ApiGetRecipes]);

    return (
        <>
            <div className={styles.topBar}>
                {user && (
                    <>
                        <button
                            className={styles.button}
                            onClick={() => openModal('addRecipe')}
                        >
                            <Plus />
                        </button>

                        <Dropdown>
                            <Dropdown.Button>
                                <User />
                            </Dropdown.Button>
                            <Dropdown.Menu>
                                <span>
                                    {user.firstName} {user.lastName}Meinseth
                                </span>
                                <button
                                    className={styles.button}
                                    onClick={toggleTheme}
                                >
                                    {theme === 'dark' ? 'Dark' : 'Light'}
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={logout}
                                >
                                    logout
                                </button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )}
                {loading && <div className={styles.loading}>loading...</div>}
            </div>
            <div className={styles.content}>
                <h1>Mat</h1>
                {!user && (
                    <button className={styles.button} onClick={login}>
                        Login
                    </button>
                )}

                {user && <RecipeList />}
            </div>
            <AddRecipeModal />
            <RecipeModal />
        </>
    );
}
