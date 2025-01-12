import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, AppRoute } from "./App";
import "./i18n.config";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter } from "react-router-dom";

// Array of routes
const routes: AppRoute[] = [
  {
    name: "main",
    path: "/",
    component: "MainPage",
    isPublic: true,
  },
  {
    name: "settings",
    path: "/settings",
    component: "SettingsPage",
    isPublic: true,
  },
  {
    name: "auth",
    path: "/auth",
    component: "AuthPage",
    isPublic: true,
  },
  {
    name: "test",
    path: "/test",
    component: "TestPage",
    isPublic: true,
  },
  {
    name: "tutorial",
    path: "/tutorial",
    component: "TutorialPage",
    isPublic: false,
  },
  {
    name: "resources",
    path: "/resources",
    component: "ResourcesPage",
    isPublic: false,
  },
  {
    name: "alphabet",
    path: "/resources/abc",
    component: "AlphabetPage",
    isPublic: true,
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
