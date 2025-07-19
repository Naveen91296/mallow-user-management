import { useEffect } from "react";
import { AppRoutes } from "./routes/routeSetup";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      localStorage.setItem("historyPath", location?.pathname);
    }
  }, []);

  return <AppRoutes />;
};

export default App;
