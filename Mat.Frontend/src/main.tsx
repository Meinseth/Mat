import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import { RecipeProvider } from './context/RecipeProvider.tsx';
import { ModalProvider } from './context/ModalProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import UsersPage from './pages/UsersPage.tsx';
import FrontPage from './pages/FrontPage.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RecipeProvider>
            <ModalProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route element={<RequireAuth />}>
                                <Route element={<App />}>
                                    <Route index element={<FrontPage />} />
                                    <Route
                                        path="users"
                                        element={<UsersPage />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    <Toaster />
                </AuthProvider>
            </ModalProvider>
        </RecipeProvider>
    </StrictMode>
);
