import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import App from './App.tsx';
import { RecipeProvider } from './context/RecipeProvider.tsx';
import { ModalProvider } from './context/ModalProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { Toaster } from 'sonner';

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
                    <Toaster />
                </AuthProvider>
            </ModalProvider>
        </RecipeProvider>
    </StrictMode>
);
