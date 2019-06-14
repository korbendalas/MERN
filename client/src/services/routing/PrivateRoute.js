import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "@services/token";
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...routeProps
}) => {
  //console.log("redirect props", routeProps);
  const token = getToken();
  if (token) {
  }

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated.isAuthenticated
  };
};
export default connect(mapStateToProps)(PrivateRoute);
