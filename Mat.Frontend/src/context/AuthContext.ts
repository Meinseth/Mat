import { createContext, useContext } from 'react';
import type { UserDto } from 'src/services/ApiClient';

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
export type AuthContextType = {
    user: UserDto | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: UserDto | null) => void;
    isLoading: boolean;
};
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuthContext must be used within AuthProvider');
    return context;
}
