import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createProfile, getProfile } from "@actions/auth";

const editProfileSchema = Yup.object().shape({
  handle: Yup.string()
    .min(4)
    .max(50)
    .required("Provide a profile handle "),
  status: Yup.string().required(),
  skills: Yup.string()
    .required()
    .max(50, "Don't spam to much."),
  twitter: Yup.string().url(),
  facebook: Yup.string().url(),
  youtube: Yup.string().url(),
  linkedin: Yup.string().url(),
  instagram: Yup.string().url()
});

//initial values dolaze iz reduxa
const EditProfile = ({ user, ...props }) => {
  const initialValues = {
    status: user.profile.status ? user.profile.status : "",
    handle: user.profile.handle ? user.profile.handle : "",
    company: user.profile.company ? user.profile.company : "",
    website: user.profile.website ? user.profile.website : "",
    location: user.profile.location ? user.profile.location : "",
    skills: user.profile.skills ? user.profile.skills.join(",") : "",
    githubusername: user.profile.githubusername
      ? user.profile.githubusername
      : "",
    bio: user.profile.bio ? user.profile.bio : "",
    twitter: user.profile.social ? user.profile.social.twitter : "",
    facebook: user.profile.social ? user.profile.social.facebook : "",
    youtube: user.profile.social ? user.profile.social.youtube : "",
    linkedin: user.profile.social ? user.profile.social.linkedin : "",
    instagram: user.profile.social ? user.profile.social.instagram : ""
  };

  useEffect(() => {
    props.getProfile();
  }, [user.hasSetProfile]);

  //Compoment has been reused for edit

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>

      <Formik
        enableReinitialize
        onSubmit={values => {
          console.log("submited", values);
          props.createProfile(values, props.history);
        }}
        initialValues={initialValues}
        validationSchema={editProfileSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, ...props }) => {
          // console.log("PROPS", props);
          // console.log("errors", errors);
          return (
            <Form className="form">
              <div className="form-group">
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option onChange={handleChange} value="0">
                    * Select Professional Status
                  </option>
                  <option onChange={handleChange} value="Developer">
                    Developer
                  </option>
                  <option onChange={handleChange} value="Junior Developer">
                    Junior Developer
                  </option>
                  <option onChange={handleChange} value="Senior Developer">
                    Senior Developer
                  </option>
                  <option onChange={handleChange} value="Manager">
                    Manager
                  </option>
                  <option onChange={handleChange} value="Student or Learning">
                    Student or Learning
                  </option>
                  <option onChange={handleChange} value="Instructor">
                    Instructor or Teacher
                  </option>
                  <option onChange={handleChange} value="Intern">
                    Intern
                  </option>
                  <option value="Other">Other</option>
                </select>
                <small className="form-text">
                  Give us an idea of where you are at in your career
                </small>

                {/* {(errors.name && touched.name) || invalidName ? (
                  <span className="text-danger">
                    {errors.name || invalidName}
                  </span>
                ) : null} */}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Handle"
                  name="handle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.handle}
                />
                <small className="form-text">Could be any name</small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                />
                <small className="form-text">
                  Could be your own company or one you work for
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Website"
                  name="website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website}
                />
                <small className="form-text">
                  Could be your own or a company website
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                />
                <small className="form-text">
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="* Skills"
                  name="skills"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.skills}
                />
                <small className="form-text">
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.githubusername}
                />
                <small className="form-text">
                  If you want your latest repos and a Github link, include your
                  username
                </small>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="A short bio of yourself"
                  name="bio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bio}
                />
                <small className="form-text">
                  Tell us a little about yourself
                </small>
              </div>

              <div className="my-2">
                {/* <button type="button" className="btn btn-light">
                  Add Social Network Links
                </button> */}
                <span>Optional</span>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.twitter}
                />
              </div>
              {errors.twitter && touched.twitter ? (
                <span className="text-danger">{errors.twitter}</span>
              ) : null}

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.facebook}
                />
              </div>
              {errors.facebook && touched.facebook ? (
                <span className="text-danger">{errors.facebook}</span>
              ) : null}

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.youtube}
                />
              </div>
              {errors.youtube && touched.youtube ? (
                <span className="text-danger">{errors.youtube}</span>
              ) : null}

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.linkedin}
                />
              </div>
              {errors.youtube && touched.youtube ? (
                <span className="text-danger">{errors.youtube}</span>
              ) : null}

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.instagram}
                />
              </div>
              {errors.instagram && touched.instagram ? (
                <span className="text-danger">{errors.instagram}</span>
              ) : null}
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

//
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(EditProfile);
