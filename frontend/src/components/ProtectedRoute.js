import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component loggedIn={props.loggedIn} Logout={props.Logout} userEmail={props.userEmail} /> : <Navigate to="/login" replace/>
)}

export default ProtectedRouteElement;
