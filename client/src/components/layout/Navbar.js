import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "@actions/auth";
import history from "@history";

const Navbar = props => {
  return (
    <nav className="navbar bg-dark">
      {props.isAuthenticated ? (
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

        {props.isAuthenticated === true ? (
          <>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-user" /> Dashboard
              </Link>
            </li>
            <li>
              <Link onClick={() => props.logOut(history)} to="#">
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

const mapStateToProps = state => {
  return { isAuthenticated: state.isAuthenticated.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
