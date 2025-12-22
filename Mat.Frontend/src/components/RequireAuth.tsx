import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function RequireAuth() {
    const { user, isLoading } = useAuthContext();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>;

    if (!user)
        return <Navigate to="/login" replace state={{ from: location }} />;

    return <Outlet />;
}
