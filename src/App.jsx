import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { CheckingAuth } from "./shared/components/CheckingAuth";
import { useCheckAuth } from "./hooks/useCheckAuth";

export const App = () => {
  const isChecking = useCheckAuth();

  if (isChecking) return <CheckingAuth />;
  return <RouterProvider router={AppRouter} />;
};
