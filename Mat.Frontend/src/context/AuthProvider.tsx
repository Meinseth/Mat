import { useEffect, useState } from 'react';
import { ApiClient, type UserDto } from '../services/ApiClient';
import { AuthContext } from './AuthContext';
import { handleApiAsync } from './ContextHelper';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserDto | null>(null);
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
        handleApiAsync(setLoading, async () => {
            const me = await api.getApiUsersMe();
            setUser(me);
        });
    }, []);

    const login = async () => {
        window.location.href = '/api/auth/login';
    };

    const logout = async () => {
        window.location.href = '/api/auth/logout';
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, setUser, isLoading: loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}
