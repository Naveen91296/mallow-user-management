import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "./routeConstants";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!Cookies.get("accessToken"); 
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
