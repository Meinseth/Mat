import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { RecipeProvider } from "./context/recipeContext.tsx";
import { ModalProvider } from "./context/modalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecipeProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </RecipeProvider>
  </StrictMode>
);
