import React, { useState, useEffect } from "react";
import { getPost, addCommentToPost, deleteCommentPost } from "@endpoints/posts";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Comment from "./Coment";
import { connect } from "react-redux";
import { getProfile } from "@actions/actions";
const PostWithComments = props => {
  const [post, setPost] = useState(null);

  const getSinglePost = async id => {
    const { data, error } = await getPost(id);
    if (data) {
      console.log("post with comment", data.data);
      setPost(data.data);
    } else if (error) {
      console.log("Greska sa prizivanjem posta", error.response.data);
    }
  };

  const initialValues = {
    text: ""
  };
  const commentSchema = Yup.object().shape({
    text: Yup.string()
      .min(10, "Minimum number of characters is 10")
      .max(300, "Max number of characters is 300")
      .required("Text field cannot be empty")
  });

  const addComment = async (text, postId) => {
    const { data, error } = await addCommentToPost(text, postId);
    if (data) {
      console.log("Komentar dodat", data.data);
      getSinglePost(props.match.params.postId); //da update listu komentara nakon dodatog com
    } else if (error)
      console.log("greska kod dodavanja komentara", error.response);
  };

  const deleteCommentPostOnClick = async (postId, commentId) => {
    const { data, error } = await deleteCommentPost(postId, commentId);
    if (data) {
      console.log("comment deleted !!!!");
      getSinglePost(props.match.params.postId);
    } else if (error) console.log("greska kod brisanja komentara");
  };

  useEffect(() => {
    getSinglePost(props.match.params.postId);
    props.getProfile();
  }, []);

  console.log("post with comments props", props);
  //console.log("post wcomnt", post);
  return (
    <>
      <Link to={"/posts"} className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post ? post.user : null}`}>
            <img
              className="round-img"
              src={
                Object.keys(props.user.profile).length
                  ? props.user.profile.user.avatar
                  : "Loading img"
              }
              alt="Profile img"
            />

            <h4>{props.match.params.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post ? post.text : "spinner"}</p>
          <p className="post-date">Posted on {post ? post.date : "spinner"}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>

        <Formik
          onSubmit={(values, actions) => {
            actions.resetForm();
            addComment(values, post ? post._id : "");
            console.log("values", values);
          }}
          initialValues={initialValues}
          validationSchema={commentSchema}
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

      <div className="comments">
        {post
          ? post.comments.map(comment => (
              <Comment
                {...comment}
                postId={props.match.params.postId}
                key={comment._id}
                commentCreatorId={
                  Object.keys(props.user.profile).length
                    ? props.user.profile.user._id
                    : ""
                }
                deleteComment={deleteCommentPostOnClick}
              />
            ))
          : "NO COMMENTS or SPINNER"}
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
)(PostWithComments);
