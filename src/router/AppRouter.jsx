import { Outlet, createBrowserRouter } from "react-router-dom";
import { authRouter } from "../auth/routes/AuthRouter";
import { parentAuthPath } from "../auth/routes/AuthRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { JournalPage } from "../journal/pages/JournalPage";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <JournalPage />,
      </PrivateRoutes>
    ),
  },
  {
    path: parentAuthPath,
    element: (
      <PublicRoutes>
        <Outlet />
      </PublicRoutes>
    ),
    children: authRouter,
  },
]);
