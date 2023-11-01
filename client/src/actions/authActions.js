import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (dispatch) => {
  return {
    onSignUp: (userData, history) => {
      axios
        .post("/api/users/register", userData)
        .then((res) =>
          history.push({
            pathname: "/login",
            state: { message: "You have successfully registered." },
          })
        )
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const loginUser = (dispatch) => {
  return {
    onLogin: (userData) => {
      axios
        .post("/api/users/login", userData)
        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          const decodeUser = jwt_decode(token);
          dispatch(setCurrentUser(decodeUser));
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

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  };
};

export const logoutUser = (dispatch) => {
  return {
    onLogout: () => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch(setCurrentUser({}));
    },
  };
};
