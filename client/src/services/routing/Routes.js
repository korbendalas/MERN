import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "@components/layout/Landing";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";
import Dashboard from "@components/dashboard/Dashboard";
import CreateProfile from "@components/profile/CreateProfile";
import EditProfile from "@components/profile/EditProfile";
import AddExperience from "@components/profile/AddExperience";
import AddEducation from "@components/profile/AddEducation";
import Profiles from "@components/profile/Profiles";
import Profile from "@components/profile/Profile";
import Posts from "@components/posts/Posts";
import PostWithComments from "@components/posts/PostWithComments";
import { getProfile } from "@actions/actions";

import { useSelector, useDispatch } from "react-redux";

const Routes = props => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const info = useSelector(state => state.user.info);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuthenticated && Object.keys(info).length === 0) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <Switch>
      {isAuthenticated && (
        <>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-profile" component={CreateProfile} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/add-experience" component={AddExperience} />
          <Route exact path="/add-education" component={AddEducation} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/postwithcoment" component={PostWithComments} />
        </>
      )}
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/register" component={Register} /> */}
    </Switch>
  );
};

export default Routes;
