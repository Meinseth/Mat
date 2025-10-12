import AddRecipeModal from './modals/addRecipeModal.tsx'
import RecipeList from './components/recipeList.tsx'
import { Plus, User } from 'lucide-react'
import styles from './styles/styles.module.css'
import { useModalContext } from './context/modal/useModalContext.tsx'
import RecipeModal from './modals/viewRecipeModal.tsx'
import { useAuthContext } from './context/auth/useAuthContext.tsx'
import { useEffect } from 'react'
import { useRecipesContext } from './context/recipe/useRecipeContext.ts'
import { Dropdown } from './components/dropdown/dropdown.tsx'

export default function App() {
    const { getRecipes } = useRecipesContext()
    const { openModal } = useModalContext()
    const { user, login, logout, loading } = useAuthContext()

    useEffect(() => {
        if (user) getRecipes()
    }, [user, getRecipes])

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
    )
}
