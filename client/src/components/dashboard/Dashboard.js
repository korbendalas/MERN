import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProfile, deleteProfile } from "@actions/auth";
import { deleteExperience, deleteEducation } from "@endpoints/user";
import { Link } from "react-router-dom";
import history from "@history";

const Dashboard = ({ user, ...props }) => {
  const [changedData, setChangedData] = useState(false);

  useEffect(() => {
    props.getProfile();
  }, []);
  console.log("DASHBOARD PROPS", user);

  const deleteExperienceOnClick = async id => {
    const { data, error } = await deleteExperience(id);
    props.getProfile();

    if (data) {
      props.getProfile();
    } else if (error) {
    }
  };
  // ################# NOT GOOD BUT WORKS! #########################

  const deleteEducationOnClick = async id => {
    const { data, error } = await deleteEducation(id);
    if (data) {
      props.getProfile();
    }
  };

  return (
    <>
      {!user.hasSetProfile ? (
        <div>
          <p>You need to setup your profile</p>
          <Link to="/create-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary" /> Create Profile
          </Link>
        </div>
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user.profile.user.name}
          </p>
          <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary" /> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary" /> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary" /> Add Education
            </Link>
          </div>

          <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {Object.keys(user.profile).length
                ? user.profile.experience.map(exp => (
                    <tr key={exp._id}>
                      <td>{exp.company}</td>
                      <td className="hide-sm">{exp.title}</td>
                      <td className="hide-sm">
                        {exp.from} - {exp.to ? exp.to : "Now"}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteExperienceOnClick(exp._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : null}

              {/* <tr>
                <td>Traversy Media</td>
                <td className="hide-sm">Instructor & Developer</td>
                <td className="hide-sm">02-03-2015 - Now</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr> */}
            </tbody>
          </table>

          <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {Object.keys(user.profile).length
                ? user.profile.education.map(edu => (
                    <tr key={edu._id}>
                      <td>{edu.school}</td>
                      <td className="hide-sm">{edu.degree}</td>
                      <td className="hide-sm">
                        {edu.from} - {edu.to ? edu.to : "Now"}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteEducationOnClick(edu._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <div className="my-2">
            <button
              onClick={() => props.deleteProfile(history)}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus" />
              Delete My Account
            </button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { getProfile, deleteProfile }
)(Dashboard);
