import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ onlyUnAuth, children }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const location = useLocation();

  if (onlyUnAuth && currentUser?.email) {
    const from = location.state?.from || { pathname: "/" };
    return (
      <Navigate to={from} replace />
    )
  }
  if (!onlyUnAuth && !currentUser?.email) {
    return (
      <Navigate to={{ pathname: "/signin" }} state={{from: location}}/>
    )
  }


  return children;
};

export default ProtectedRoute;
