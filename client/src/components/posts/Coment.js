import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfilePublic } from "@endpoints/user";
import { deleteCommentPost } from "@endpoints/posts";
const Coment = props => {
  const [commentCreator, setCommentCreator] = useState("");
  //console.log("comment props", props);

  useEffect(() => {
    getCommentCreator(props.user);
  }, []);

  const getCommentCreator = async commentCreatorId => {
    const { data, error } = await getProfilePublic(commentCreatorId);
    if (data) {
      //console.log("post creator - POST", data.data.user);
      setCommentCreator(data.data.user);
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${props.user}`}>
            <img
              className="round-img"
              src={
                commentCreator
                  ? commentCreator.avatar
                  : "nema slike ili spinner"
              }
              alt=""
            />
            <h4>
              {commentCreator ? commentCreator.name : "Nema imena ili spinner"}
            </h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{props.text}</p>
          <p className="post-date">Posted on {props.date}</p>

          {props.commentCreatorId === props.user ? (
            <button
              onClick={() => props.deleteComment(props.postId, props._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Coment;
