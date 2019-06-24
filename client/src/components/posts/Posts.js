import React, { useState, useEffect } from "react";
import { getPosts, addPost } from "@endpoints/posts";
import { getProfilePublic } from "@endpoints/user";
import { Link } from "react-router-dom";
import Post from "./Post";
import { getProfile } from "@actions/actions";

import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Posts = props => {
  const [posts, setPosts] = useState({});

  const initialValues = {
    text: ""
  };
  const postSchema = Yup.object().shape({
    text: Yup.string()
      .min(10, "Minimum number of characters is 10")
      .max(300, "Max number of characters is 300")
    //.required("")
  });

  useEffect(() => {
    getAllPosts();
    props.getProfile();
  }, []);

  //gets all posts on load

  const getAllPosts = async () => {
    const { data, error } = await getPosts();
    if (data) {
      console.log("stigli postovi", data.data);
      setPosts(data.data);
    } else if (error) {
      console.log("greska u dobavljanju postova", error);
    }
  };

  const addNewPost = async text => {
    const { data, error } = await addPost(text);
    if (data) {
      getAllPosts();
    } else if (error) console.log("Greska sa postavljanjem posta. ");
  };

  //console.log("POSTS PROPS", props);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>

        <Formik
          onSubmit={(values, actions) => {
            actions.resetForm();
            addNewPost(values);
          }}
          initialValues={initialValues}
          validationSchema={postSchema}
        >
          {({
            handleChange,
            handleBlur,
            resetForm,
            values,
            errors,
            touched,
            ...formikProps
          }) => {
            // console.log("FORMIK PROPS", formikProps);
            // console.log("errors", errors);
            return (
              <Form className="form">
                <div className="form-group">
                  <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="What's on you mind...."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                  />

                  {errors.text && touched.text ? (
                    <span className="text-danger">{errors.text}</span>
                  ) : null}
                </div>
                <input
                  type="submit"
                  className="btn btn-dark my-1"
                  value="Submit"
                />
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="posts">
        {Object.keys(posts).length
          ? posts.map(post => (
              <Post
                {...post}
                key={post._id}
                getAllPosts={getAllPosts}
                originalPosterId={
                  Object.keys(props.user.profile).length
                    ? props.user.profile.user._id
                    : ""
                }
              />
            ))
          : "NO POSTS OR SPINNER"}
      </div>
    </>
  );
};
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { getProfile }
)(Posts);
