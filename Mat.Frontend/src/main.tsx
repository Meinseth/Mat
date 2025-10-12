import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import { RecipeProvider } from './context/recipe/RecipeProvider.tsx';
import { ModalProvider } from './context/modal/modalProvider.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RecipeProvider>
            <ModalProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </ModalProvider>
        </RecipeProvider>
    </StrictMode>
);
