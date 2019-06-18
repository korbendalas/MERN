import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";

import { login, getProfile } from "@actions/actions";
import { Button, TextField, Container, Snackbar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  submit: {
    padding: 10,
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  const responseErrors = useSelector(state => state.user.responseErrors);
  const dispatch = useDispatch();

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
  const [invalidPassword, setInvalidPassword] = useState("");

  useEffect(() => {
    if (Object.keys(responseErrors).length) {
      if (responseErrors.email) {
        setInvalidEmail(responseErrors.email);
      }
      if (responseErrors.password) {
        setInvalidPassword(responseErrors.password);
      }
    }
  }, [responseErrors]);

  const classes = useStyles();
  console.log("LOGIN PROPS", props);
  return (
    <>
      <Container maxWidth="md">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign into Your Account
        </p>

        <Formik
          onSubmit={async values => {
            console.log("login", values);
            try {
              await dispatch(login(values, props.history));
              await dispatch(getProfile());
            } catch (err) {
              console.log(err);
            }
          }}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            ...props
          }) => {
            return (
              <Form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  type="email"
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={
                    (errors.email && touched.email) || invalidEmail
                      ? true
                      : false
                  }
                />

                {(errors.email && touched.email) || invalidEmail ? (
                  <span className="text-danger">
                    {errors.email || invalidEmail}
                  </span>
                ) : null}

                <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={
                    (errors.password && touched.password) || invalidPassword
                      ? true
                      : false
                  }
                />

                {(errors.password && touched.password) || invalidPassword ? (
                  <span className="text-danger">
                    {errors.password || invalidPassword}
                  </span>
                ) : null}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  margin="normal"
                  className={classes.submit}
                >
                  Log In
                </Button>
              </Form>
            );
          }}
        </Formik>

        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Container>
    </>
  );
};

export default Login;
