import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import "./i18n.config";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";

// Массив маршрутов
const routes = [
  {
    name: "auth",
    path: "/auth",
    component: "AuthPage",
    isPublic: true, // Публичная страница
  },
  {
    name: "test",
    path: "/test",
    component: "TestPage",
    isPublic: true, // Публичная страница
  },
  {
    name: "tutorial",
    path: "/tutorial",
    component: "TutorialPage",
    isPublic: false, // Приватная страница
  },
  {
    name: "resources",
    path: "/resources",
    component: "ResourcesPage",
    isPublic: false, // Приватная страница
  },
  {
    name: "alphabet",
    path: "/resources/abc",
    component: "AlphabetPage",
    isPublic: true, // Публичная страница
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
