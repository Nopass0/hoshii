import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "@/hooks/useUser";
import AuthPage from "./pages/AuthPage";

import AlphabetPage from "./pages/AlphabetPage";
import TestPage from "./pages/TestPage";
import { MainPage } from "./pages/MainPage";
import { AppSidebar } from "@/components/app-sidebar";
import SettingsPage from "./pages/SettingsPage";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { useEffect } from "react";

// Define the route type
export type AppRoute = {
  name: string;
  path: string;
  component: React.ComponentType;
  isPublic: boolean;
};

// Define the PrivateRoute component
const PrivateRoute: React.FC<{ component: React.ComponentType }> = ({
  component: Component,
}) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Component />;
};

// Define the PublicRoute component
const PublicRoute: React.FC<{ component: React.ComponentType }> = ({
  component: Component,
}) => {
  return <Component />;
};

// Create a mapping of component names to actual components
const componentMap: { [key: string]: React.ComponentType } = {
  MainPage,
  AuthPage,
  TestPage,
  SettingsPage,
  AlphabetPage,
};

export function App({ routes }: { routes: AppRoute[] }) {
  const { t } = useTranslation();
  const location = useLocation();

  // Function to generate breadcrumbs based on the current path
  const generateBreadcrumbs = (path: string): string[] => {
    const pathParts = path.split("/").filter(Boolean);
    return pathParts.map((part) => t(`pages.${part}`));
  };

  return (
    <SidebarProvider className="h-screen overflow-y-hidden">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3 ">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs breadcrumbs={generateBreadcrumbs(location.pathname)} />
          </div>
        </header>
        <Routes>
          {routes.map((route) => {
            const Component = componentMap[route.component];
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isPublic ? (
                    <PublicRoute component={Component} />
                  ) : (
                    <PrivateRoute component={Component} />
                  )
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
}
