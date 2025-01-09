import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { TutorialPage } from "./pages/TutorialPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import AlphabetPage from "./pages/AlphabetPage";
import { AppSidebar } from "@/components/app-sidebar";
import TestPage from "./pages/TestPage";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useAuth } from "./hooks/useAuth";
import { Separator } from "./components/ui/separator";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { useTranslation } from "react-i18next";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  return children;
}

export function App({
  routes,
}: {
  routes: Array<{ path: string; component: string; isPublic: boolean }>;
}) {
  const componentMap = {
    TestPage,
    AuthPage,
    TutorialPage,
    ResourcesPage,
    AlphabetPage,
  };

  const { t } = useTranslation();

  return (
    <SidebarProvider className="h-screen overflow-y-hidden">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3 ">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {
              <Breadcrumbs
                breadcrumbs={[t("pages.resources"), t("pages.alphabet")]}
              />
            }
          </div>
        </header>
        <Routes>
          {routes.map((route) => {
            const Component =
              componentMap[route.component as keyof typeof componentMap];
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isPublic ? (
                    <PublicRoute>
                      <Component />
                    </PublicRoute>
                  ) : (
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
                  )
                }
              />
            );
          })}
          {/* Перенаправление по умолчанию */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
}
