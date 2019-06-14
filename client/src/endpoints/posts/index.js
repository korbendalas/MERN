//POSTS
import toResponse from "@toResponse";
import http from "@services/http";

//Public
export const getPosts = () => toResponse(http.get("/api/posts"));

//api/posts/:id
// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

export const getPost = id => toResponse(http.get(`/api/posts/${id}`));

//Private
export const addPost = credentials =>
  toResponse(http.post("/api/posts", credentials));

//Private
export const deletePost = id => toResponse(http.delete(`/api/posts/${id}`));

//Private
export const likePost = id => toResponse(http.post(`/api/posts/like/${id}`));

//Private
export const unlikePost = id =>
  toResponse(http.post(`/api/posts/unlike/${id}`));

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
//Private
export const addCommentToPost = (credentials, id) =>
  toResponse(http.post(`/api/posts/comment/${id}`, credentials));

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
//Private
export const deleteCommentPost = (postId, commentId) =>
  toResponse(http.delete(`/api/posts/comment/${postId}/${commentId}`));
