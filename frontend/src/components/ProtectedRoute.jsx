import React from 'react';
import { Route } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props  }) => {
  return loggedIn &&
    <Route { ...props } />
}

export default ProtectedRoute;
