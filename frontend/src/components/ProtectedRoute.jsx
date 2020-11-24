import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props  }) => {
  return loggedIn ?
    <Route { ...props } /> :
    <Redirect to="/signin" />
}

export default ProtectedRoute;
