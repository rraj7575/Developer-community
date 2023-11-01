import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
} from "./types";

export const addPost = (dispatch) => {
  return {
    onAddPost: (postData) => {
      dispatch(clearErrors());
      axios
        .post("/api/posts", postData)
        .then((res) => {
          dispatch({
            type: ADD_POST,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const deletePost = (dispatch) => {
  return {
    onDeletePost: (id) => {
      axios
        .delete(`/api/posts/${id}`)
        .then((res) => {
          dispatch({
            type: DELETE_POST,
            payload: id,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const addLike = (dispatch) => {
  return {
    onAddLike: (id) => {
      axios
        .post(`/api/posts/like/${id}`)
        .then((res) => getPosts(dispatch).onGetPosts())
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const removeLike = (dispatch) => {
  return {
    onRemoveLike: (id) => {
      axios
        .delete(`/api/posts/unlike/${id}`)
        .then((res) => getPosts(dispatch).onGetPosts())
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const getPosts = (dispatch) => {
  return {
    onGetPosts: () => {
      dispatch(setPostLoading());
      axios
        .get("/api/posts")
        .then((res) => {
          dispatch({
            type: GET_POSTS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_POSTS,
            payload: null,
          });
        });
    },
  };
};

export const getPost = (dispatch) => {
  return {
    onGetPost: (id) => {
      dispatch(setPostLoading());
      axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          dispatch({
            type: GET_POST,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_POST,
            payload: null,
          });
        });
    },
  };
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

export const addComment = (dispatch) => {
  return {
    onAddComment: (postId, commentData) => {
      dispatch(clearErrors());
      axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then((res) => {
          dispatch({
            type: GET_POST,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const deleteComment = (dispatch) => {
  return {
    onDeleteComment: (postId, commentId) => {
      axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then((res) => {
          dispatch({
            type: GET_POST,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
