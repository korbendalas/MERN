import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addEducation } from "@endpoints/user";
const AddEducation = props => {
  const initialValues = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: ""
  };

  const addEducationSchema = Yup.object().shape({
    school: Yup.string()

      .min(1)
      .max(50)
      .required(),
    degree: Yup.string()
      .required()
      .min(1)
      .max(255),

    fieldofstudy: Yup.string(),
    from: Yup.string(),
    to: Yup.string(),
    description: Yup.string()
  });

  const addEducationSubmit = async credentials => {
    const { data, error } = await addEducation(credentials);
    if (data) {
      props.history.push("/dashboard");
    }
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <Formik
        onSubmit={values => {
          addEducationSubmit(values);
          console.log("submited", values);
        }}
        initialValues={initialValues}
        validationSchema={addEducationSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          return (
            <Form className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="* School or Bootcamp"
                  name="school"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.school}
                />
              </div>
              {errors.school && touched.school ? (
                <span className="text-danger">{errors.school}</span>
              ) : null}

              <div className="form-group">
                <input
                  type="text"
                  placeholder="* Degree or Certificate"
                  name="degree"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.degree}
                />
              </div>

              {errors.degree && touched.degree ? (
                <span className="text-danger">{errors.degree}</span>
              ) : null}

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Field Of Study"
                  name="fieldofstudy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fieldofstudy}
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
              <div className="form-group">
                <p>
                  <input
                    type="checkbox"
                    name="current"
                    value=""
                    onChange={handleChange}
                    value={values.current}
                  />{" "}
                  Current School or Bootcamp
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
                  placeholder="School Description"
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

export default AddEducation;
