import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props  }) => {
  return loggedIn &&
    <Route { ...props } />
}

export default ProtectedRoute;
