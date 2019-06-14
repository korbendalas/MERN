import React, { useEffect, useState } from "react";
import { getAllProfiles } from "@endpoints/user";
import { Link } from "react-router-dom";
const Profiles = props => {
  //stavi spinner ako je profiles prazan : pun obj
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    const { data, error } = await getAllProfiles();
    if (data) {
      setProfiles(data.data);
      console.log("radi profiles", data.data);
    } else if (error) {
      console.log("greska u profilima", error);
    }
  };

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" /> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {Object.keys(profiles).length
          ? profiles.map(profile => (
              <div className="profile bg-light" key={profile._id}>
                <img className="round-img" src={profile.user.avatar} alt="" />
                <div>
                  <h2>{profile.user.name}</h2>
                  <p>
                    {profile.status} at{" "}
                    {profile.company.charAt(0).toUpperCase() +
                      profile.company.slice(1)}
                  </p>
                  <p>
                    {profile.location.charAt(0).toUpperCase() +
                      profile.location.slice(1)}
                  </p>
                  <Link
                    to={`/profile/${profile.user._id}`}
                    className="btn btn-primary"
                  >
                    View Profile
                  </Link>
                </div>

                <ul>
                  {Object.keys(profiles).length
                    ? profile.skills.map((skill, index) => (
                        <li className="text-primary" key={index}>
                          <i className="fas fa-check" /> {skill}
                        </li>
                      ))
                    : " No skills"}
                </ul>
              </div>
            ))
          : "SPINNER"}
      </div>
    </>
  );
};

export default Profiles;
