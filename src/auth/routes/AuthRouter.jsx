import { Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import { authRoutes } from "./AuthRoutes";

export const authRouter = [
  {
    path: authRoutes.login,
    element: <LoginPage />,
  },
  {
    path: authRoutes.register,
    element: <RegisterPage />,
  },
  {
    index: true,
    element: <Navigate to={authRoutes.login} />,
  },
];
