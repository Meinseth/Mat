import Modal from './modal';
import { useModalContext } from '../context/ModalContext';
import RecipeForm from '../components/recipeForm';

export default function AddRecipeModal() {
    const { activeModal, closeModal } = useModalContext();
    const isOpen = activeModal === 'addRecipe';

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <RecipeForm
                title="Legg til oppskrift"
                type="Add"
                closeModal={closeModal}
            />
        </Modal>
    );
}
