import PropTypes from "prop-types";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { authStates } from "../store/auth/authSatates";
import { Navigate } from "react-router-dom";
import { authRoute, authRoutes } from "../auth/routes/AuthRoutes";

export const PrivateRoutes = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const isLoggedIn = useMemo(
    () => status === authStates.authenticated,
    [status]
  );
  return isLoggedIn ? children : <Navigate to={authRoute(authRoutes.login)} />;
};
PrivateRoutes.propTypes = {
  children: PropTypes.any,
};
