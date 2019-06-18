import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { logOut } from "@actions/actions";
import history from "@history";
import { useSelector, useDispatch } from "react-redux";
import { userInfo } from "os";

const Navbar = props => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return (
    <nav className="navbar bg-dark">
      {isAuthenticated ? (
        <h1>
          <Link to="/posts">
            <i className="fas fa-code" /> DevConnector
          </Link>
        </h1>
      ) : (
        <h1>
          <Link to="/">
            <i className="fas fa-code" /> DevConnector
          </Link>
        </h1>
      )}
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>

        {isAuthenticated === true ? (
          <>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-user" /> Dashboard
              </Link>
            </li>
            <li>
              <Link onClick={() => logOut(history)} to="#">
                <i className="fas fa-sign-out-alt" /> Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
