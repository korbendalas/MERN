import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "@components/layout/Navbar";
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
import PostWithComments from "./components/posts/PostWithComments";

import PrivateRoute from "@services/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />

              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />

              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute
                exact
                path="/posts/:name/post/:postId"
                component={PostWithComments}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/profiles" component={Profiles} />

              <Route exact path="/profile/:id" component={Profile} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}
export default App;
