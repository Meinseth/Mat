import { useEffect, useState } from 'react';
import { ApiClient, type UserDto } from '../services/ApiClient';
import { ApiBaseUrl } from '../services/ApiBaseUrl';
import { AuthContext } from './AuthContext';
import { handleAsync } from './ContextHelper';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);

    const api = new ApiClient(ApiBaseUrl, {
        fetch: (input, init) => {
            return window.fetch(input, {
                ...init,
                credentials: 'include',
            });
        },
    });

    useEffect(() => {
        handleAsync(setLoading, async () => {
            const me = await api.getApiUserMe();
            setUser(me);
        });
    }, []);

    const login = async () => {
        window.location.href = `${ApiBaseUrl}/api/auth/login`;
    };

    const logout = async () => {
        window.location.href = `${ApiBaseUrl}/api/auth/logout`;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
