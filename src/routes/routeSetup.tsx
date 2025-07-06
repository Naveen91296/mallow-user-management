import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoginPage from "../pages/Login";
import { LoadingSpinner, NotFound } from "../components/ui";
import { Header } from "../components/layout";
import { ROUTES } from "./routeConstants";
import { ProtectedRoute } from "./ProtectedRoute";

const UserLayout = lazy(() => import("../components/Users"));
const UsersTablePage = lazy(() => import("../pages/Users/Table"));
const UsersCardPage = lazy(() => import("../pages/Users/Cards"));

export const AppRoutes = () => {
  const location = useLocation();

  // header display route paths
  const showHeaderRoutes: string[] = [ROUTES.USERS_TABLE, ROUTES.USERS_CARDS];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path={ROUTES.ROOT}
            element={<Navigate to={ROUTES.USERS} replace />}
          />

          {/* Public Route */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="table" replace />} />
            <Route path="table" element={<UsersTablePage />} />
            <Route path="cards" element={<UsersCardPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};
