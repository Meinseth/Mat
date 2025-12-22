import { ApiClient, type UserDto } from 'src/services/ApiClient';
import styles from '../styles/styles.module.css';
import { useEffect, useState } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);

    const api = new ApiClient('', {
        fetch: (input, init) => {
            return window.fetch(input, {
                ...init,
                credentials: 'include',
            });
        },
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const result = await api.getApiUsers();
                setUsers(result);
            } catch (error) {
                console.error('Failed to fetch users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className={styles.content}>
                <h1>Brukere</h1>
            </div>
            {loading && <div>Loading users...</div>}
            <div className={styles.recipeList}>
                {users.map((user, index) => (
                    <div key={index}>
                        {user.firstName} {user.lastName}
                    </div>
                ))}
            </div>
        </>
    );
}
