import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfilePublic } from "@endpoints/user";

const Profile = props => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfileOnLoad();
  }, []);

  const getProfileOnLoad = async () => {
    const { data, error } = await getProfilePublic(props.match.params.id);
    if (data) {
      // console.log("profil je ucitan ", data);
      setProfile(data.data);
    } else if (error) {
      console.log("greska u Profile komponenti", error);
    }
  };
  console.log("profil", profile);
  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={Object.keys(profile).length ? profile.user.avatar : null}
            alt="profile photo"
          />
          <h1 className="large">
            {" "}
            {profile.user ? profile.user.name : "Name"}
          </h1>
          <p className="lead">
            {profile.status} at{" "}
            {Object.keys(profile).length
              ? profile.company.charAt(0).toUpperCase() +
                profile.company.slice(1)
              : "Position Name"}
          </p>
          <p>
            {" "}
            {Object.keys(profile).length
              ? profile.location.charAt(0).toUpperCase() +
                profile.location.slice(1)
              : "Company Address"}{" "}
          </p>

          <div className="icons my-1">
            {Object.keys(profile).length && profile.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x" />
              </a>
            ) : null}

            {Object.keys(profile).length && profile.social.twitter ? (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            ) : null}

            {Object.keys(profile).length && profile.social.facebook ? (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            ) : null}

            {Object.keys(profile).length && profile.social.linkedin ? (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            ) : null}

            {Object.keys(profile).length && profile.social.youtube ? (
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            ) : null}

            {Object.keys(profile).length && profile.social.instagram ? (
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            ) : null}
          </div>
        </div>

        {/* <!-- About --> */}
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">
            {profile.user ? profile.user.name : "Name"}'s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className="line" />
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {Object.keys(profile).length
              ? profile.skills.map((skill, index) => (
                  <div className="p-1" key={index}>
                    <i className="fa fa-check" />
                    {skill}
                  </div>
                ))
              : "Nema skilova"}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>

          {Object.keys(profile).length
            ? profile.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="text-dark">{exp.company}</h3>
                  <p>
                    {exp.from} - {exp.current ? "Current" : exp.to}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {exp.title}
                  </p>
                  <p>
                    <strong>Description: </strong>{" "}
                    {exp.description ? exp.description : "No description"}
                  </p>
                </div>
              ))
            : "No Experience or spinner"}
        </div>

        {/* <!-- Education --> */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {Object.keys(profile).length
            ? profile.education.map((edu, index) => (
                <div key={index}>
                  <h3>{edu.school}</h3>
                  <p>
                    {edu.from} - {edu.current ? "Current" : edu.to}
                  </p>
                  <p>
                    <strong>Degree: </strong>
                    {edu.degree}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {edu.fieldofstudy}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {edu.description ? edu.description : "No description"}
                  </p>
                </div>
              ))
            : "No education or spinner"}
        </div>

        {/* <!-- Github --> */}
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github" /> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo One
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo Two
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
