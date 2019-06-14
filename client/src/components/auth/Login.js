import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { login } from "@actions/auth";

const Login = props => {
  const initialValues = {
    email: "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .label("Email")
      .email()
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Too LONG!.")
  });
  const [invalidEmail, setInvalidEmail] = useState("");
  useEffect(() => {
    if (typeof props.serverErrors !== "undefined") {
      if (props.serverErrors.email) {
        setInvalidEmail(props.serverErrors.email);
      }
    }
  }, []);
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <Formik
        onSubmit={values => {
          // console.log("submitedLogin", values);
          props.login(values, props.history);
        }}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          // console.log("PROPS", props);
          // console.log("errors", errors);
          return (
            <Form className="form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {/* 
                {errors.email && touched.email ? (
                  <span className="text-danger">{errors.email}</span>
                ) : null} */}

                {(errors.email && touched.email) || invalidEmail ? (
                  <span className="text-danger">
                    {errors.email || invalidEmail}
                  </span>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <span className="text-danger">{errors.password}</span>
                ) : null}
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
            </Form>
          );
        }}
      </Formik>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    isAuthenticated: state.isAuthenticated.isAuthenticated,
    serverErrors: state.isAuthenticated.serverErrors
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
