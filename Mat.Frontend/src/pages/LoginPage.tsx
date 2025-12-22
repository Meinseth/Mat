import { useAuthContext } from 'src/context/AuthContext';
import styles from '../styles/styles.module.css';

export default function LoginPage() {
    const { login, isLoading } = useAuthContext();

    return (
        <div className={styles.content}>
            <h1>Mat</h1>

            <button className={styles.button} onClick={login}>
                {isLoading ? 'Signing in…' : 'Login'}
            </button>
        </div>
    );
}
