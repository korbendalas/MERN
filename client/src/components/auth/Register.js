import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { register, resetRegister } from "@actions/actions";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css"; //obavezan import => core funkcionalnost
import "react-s-alert/dist/s-alert-css-effects/slide.css"; // opcinoalni import => efekat koji zelim da postignem

const Register = props => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };
  useEffect(() => {
    if (typeof props.serverErrors !== "undefined") {
      if (props.serverErrors.name) {
        setInvalidName(props.serverErrors.name);
      }
      if (props.serverErrors.email) {
        setInvalidEmail(props.serverErrors.email);
      }
      if (props.serverErrors.password) {
        setInvalidPassword(props.serverErrors.password);
      }
      if (props.serverErrors.password2) {
        setInvalidPassword2(props.serverErrors.password2);
      }
    }
  }, [props.serverErrors]);

  //when user registration is succesfull
  useEffect(() => {
    if (props.isRegistered) {
      setTimeout(() => {
        props.history.replace("/login");
        props.resetRegister();
      }, 700);
    }
  }, [props.isRegistered]);

  const [invalidName, setInvalidName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPassword2, setInvalidPassword2] = useState("");

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(6)
      .max(50)
      .required("Name is required"),
    email: Yup.string()
      .label("Email")
      .email()
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "We prefer insecure system, try a shorter password."),

    password2: Yup.string()
      .required("Password2 is required")
      .test("passwords-match", "Passwords must match", function(value) {
        return this.parent.password === value;
      })
  });
  // console.log("is REGISTERED", props.isRegistered);
  // console.log(
  //   "props errors redux",
  //   props.serverErrors ? props.serverErrors : "nema gresaka"
  // );
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>

      <Formik
        onSubmit={values => {
          props.register(values);
          // console.log("submited", values);
        }}
        initialValues={initialValues}
        validationSchema={registerSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          // console.log("PROPS", props);
          // console.log("errors", errors);
          return (
            <Form className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {(errors.name && touched.name) || invalidName ? (
                  <span className="text-danger">
                    {errors.name || invalidName}
                  </span>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {(errors.email && touched.email) || invalidEmail ? (
                  <span className="text-danger">
                    {errors.email || invalidEmail}
                  </span>
                ) : null}

                <small className="form-text">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
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
                {(errors.password && touched.password) || invalidPassword ? (
                  <span className="text-danger">
                    {errors.password || invalidPassword}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password2}
                />
                {(errors.password2 && touched.password2) || invalidPassword2 ? (
                  <span className="text-danger">
                    {errors.password2 || invalidPassword2}
                  </span>
                ) : null}
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </Form>
          );
        }}
      </Formik>

      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};
const mapStateToProps = state => {
  return {
    isRegistered: state.isRegistered.isRegistered,
    serverErrors: state.isRegistered.serverErrors
  };
};

export default connect(
  mapStateToProps,
  { register, resetRegister }
)(Register);
