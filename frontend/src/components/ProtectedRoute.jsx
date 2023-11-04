import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { LoggedUserContext } from '../contexts/LoggedUserContext';

const ProtectedRoute = ({ onlyUnAuth, children }) => {
  const loggedUser = React.useContext(LoggedUserContext);

  const location = useLocation();

  if (onlyUnAuth && loggedUser?.email) {
    const from = location.state?.from || { pathname: "/" };
    return (
      <Navigate to={from} replace />
    )
  }
  if (!onlyUnAuth && !loggedUser?.email) {
    return (
      <Navigate to={{ pathname: "/signin" }} state={{from: location}}/>
    )
  }


  return children;
};

export default ProtectedRoute;
