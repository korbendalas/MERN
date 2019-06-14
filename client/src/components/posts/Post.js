import React, { useState, useEffect } from "react";
import { likePost, unlikePost, deletePost } from "@endpoints/posts";
import { getProfilePublic } from "@endpoints/user";
import { Link } from "react-router-dom";

// This component is for diplaying array of posts on a front page

const Post = props => {
  // gets user of post, called upon each post is loaded
  const [postCreator, setPostCreator] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState(null);

  const getPostCreator = async postCreatorId => {
    const { data, error } = await getProfilePublic(postCreatorId);
    if (data) {
      //  console.log("post creator - POST", data.data.user);
      setPostCreator(data.data.user);
    } else if (error) {
      console.log(error);
    }
  };

  const likeCurrentPost = async id => {
    const { data, error } = await likePost(id);
    if (data) {
      console.log("post liked");
      setNumberOfLikes(data.data.likes.length);
    }
  };

  const dislikeCurrentPost = async id => {
    const { data, error } = await unlikePost(id);
    if (data) {
      console.log("dislajkovan post", data.data);
      setNumberOfLikes(data.data.likes.length);
    }
  };
  const deleteCurrentPost = async id => {
    const { data, error } = await deletePost(id);
    if (data) {
      console.log("deleted", data);
      props.getAllPosts();
    } else if (error) console.log("nece da brise ", error.response);
  };

  useEffect(() => {
    getPostCreator(props.user);
    setNumberOfLikes(props.likes.length);
  }, []);

  //console.log(" single post props", props);
  // console.log("single post, post creator", postCreator);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.user}`}>
          <img
            className="round-img"
            src={postCreator ? postCreator.avatar : "slika ili spinner"}
            alt="Post creator img"
          />
          <h4>
            {postCreator ? postCreator.name : "NEMA KORISNIKA ILI SPINNER"}
          </h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.text}</p>
        <Link to={`/posts/${postCreator.name}/post/${props._id}`}>
          <p className="post-date">Posted on {props.date}</p>
        </Link>
        <button
          onClick={() => likeCurrentPost(props._id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{numberOfLikes ? numberOfLikes : null}</span>
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={() => dislikeCurrentPost(props._id)}
        >
          <i className="fas fa-thumbs-down" />
        </button>

        {/* /posts/:name/post/:postId" */}

        <Link
          to={`/posts/${postCreator.name}/post/${props._id}`}
          className="btn btn-primary"
        >
          Comments{" "}
          <span className="comment-count">
            {props.comments.length ? props.comments.length : 0}
          </span>
        </Link>

        {props.user === props.originalPosterId ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteCurrentPost(props._id)}
          >
            <i className="fas fa-times" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
