import styles from '../styles/styles.module.css';
import { Plus, User, Users } from 'lucide-react';
import { Dropdown } from './dropdown/Dropdown';
import { useModalContext } from 'src/context/ModalContext';
import { useAuthContext } from 'src/context/AuthContext';
import useTheme from 'src/hooks/useTheme';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Topbar() {
    const { openModal } = useModalContext();
    const { user, logout, isLoading: loading } = useAuthContext();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isUsersPage = location.pathname === '/users';

    return (
        <div className={styles.topBar}>
            {user && (
                <>
                    <button
                        className={styles.button}
                        onClick={() => openModal('addRecipe')}
                    >
                        <Plus />
                    </button>

                    <button
                        className={
                            styles.button +
                            ' ' +
                            (isUsersPage ? styles.editActive : '')
                        }
                        onClick={() => navigate(isUsersPage ? '/' : '/users')}
                    >
                        <Users />
                    </button>

                    <Dropdown>
                        <Dropdown.Button>
                            <User />
                        </Dropdown.Button>
                        <Dropdown.Menu>
                            <span style={{ textAlign: 'center' }}>
                                {user.firstName} {user.lastName}
                            </span>
                            <button
                                className={styles.button}
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? 'Dark' : 'Light'}
                            </button>
                            <button className={styles.button} onClick={logout}>
                                logout
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )}
            {loading && <div className={styles.loading}>loading...</div>}
        </div>
    );
}
