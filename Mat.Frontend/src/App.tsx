import AddRecipeModal from './modals/AddRecipeModal.tsx';
import RecipeModal from './modals/ViewRecipeModal.tsx';
import Topbar from './components/Topbar.tsx';
import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <>
            <Topbar />
            <Outlet />
            <AddRecipeModal />
            <RecipeModal />
        </>
    );
}
