import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addExperience } from "@endpoints/user";

const AddExperience = props => {
  const initialValues = {
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: ""
  };

  const addExperienceSchema = Yup.object().shape({
    title: Yup.string()

      .min(1)
      .max(50)
      .required(),
    company: Yup.string()
      .required()
      .min(1)
      .max(255),

    location: Yup.string(),
    from: Yup.string().required("Date field is required"),
    to: Yup.string(),
    description: Yup.string()
  });

  const addExperienceSubmit = async credentials => {
    const { data, error } = await addExperience(credentials);
    if (data) {
      props.history.push("/dashboard");
    }
  };

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <Formik
        onSubmit={values => {
          addExperienceSubmit(values);
          console.log("submited", values);
        }}
        initialValues={initialValues}
        validationSchema={addExperienceSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          return (
            <Form className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </div>
              {errors.title && touched.title ? (
                <span className="text-danger">{errors.title}</span>
              ) : null}

              <div className="form-group">
                <input
                  type="text"
                  placeholder="* Company"
                  name="company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                />
              </div>

              {errors.company && touched.company ? (
                <span className="text-danger">{errors.company}</span>
              ) : null}

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                />
              </div>
              <div className="form-group">
                <h4>From Date</h4>
                <input
                  type="date"
                  name="from"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.from}
                />
              </div>
              {errors.from && touched.from ? (
                <span className="text-danger">{errors.from}</span>
              ) : null}
              <div className="form-group">
                <p>
                  <input
                    type="checkbox"
                    name="current"
                    value=""
                    onChange={handleChange}
                    value={values.current}
                  />{" "}
                  Current Job
                </p>
              </div>
              <div className="form-group">
                <h4>To Date</h4>
                <input
                  type="date"
                  name="to"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.to}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Job Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>
              <input type="submit" className="btn btn-primary my-1" />
              <Link className="btn btn-light my-1" to="/dashboard">
                Go Back
              </Link>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddExperience;
