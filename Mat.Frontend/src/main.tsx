import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import App from "./App.tsx";
import { RecipeProvider } from "./context/recipeContext.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import Callback from "./routes/callback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecipeProvider>
      <ModalProvider>
        <BrowserRouter>
          {" "}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </RecipeProvider>
  </StrictMode>
);
