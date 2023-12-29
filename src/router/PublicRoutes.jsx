import { useMemo } from "react";
import { useSelector } from "react-redux";
import { authStates } from "../store/auth/authSatates";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const isLoggedIn = useMemo(
    () => status === authStates.authenticated,
    [status]
  );
  return !isLoggedIn ? children : <Navigate to="/"/>;
};
PublicRoutes.propTypes = {
  children: PropTypes.object,
};
