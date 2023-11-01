import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
} from "./types";
export const getProfile = (dispatch) => {
  return {
    getCurrentProfile: () => {
      dispatch(setProfileLoading());
      axios
        .get("/api/profile")
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: GET_PROFILE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PROFILE,
            payload: {},
          });
        });
    },
  };
};

export const getProfiles = (dispatch) => {
  return {
    getAllProfile: () => {
      dispatch(setProfileLoading());
      axios
        .get("/api/profile/all")
        .then((res) => {
          dispatch({
            type: GET_PROFILES,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PROFILES,
            payload: null,
          });
        });
    },
  };
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const createProfile = (dispatch) => {
  return {
    onCreateProfile: (profileData, history) => {
      axios
        .post("/api/profile", profileData)
        .then((res) => history.push("/dashboard"))
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const deleteAccount = (dispatch) => {
  return {
    onDeleteAccount: () => {
      if (window.confirm("Are you sure? This can not be undone!")) {
        axios
          .delete("/api/profile")
          .then((res) => {
            dispatch({
              type: SET_CURRENT_USER,
              payload: {},
            });
          })
          .catch((err) => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data,
            });
          });
      }
    },
  };
};

export const deleteExperience = (dispatch) => {
  return {
    onDeleteExperience: (id) => {
      axios
        .delete(`/api/profile/experience/${id}`)
        .then((res) => {
          dispatch({
            type: GET_PROFILE,
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

export const deleteEducation = (dispatch) => {
  return {
    onDeleteEducation: (id) => {
      axios
        .delete(`/api/profile/education/${id}`)
        .then((res) => {
          dispatch({
            type: GET_PROFILE,
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

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const addExperience = (dispatch) => {
  return {
    onAddExperience: (expData, history) => {
      axios
        .post("/api/profile/experience", expData)
        .then((res) => history.push("/dashboard"))
        .catch((err) => {
          debugger;
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const addEducation = (dispatch) => {
  return {
    onAddEducation: (eduData, history) => {
      axios
        .post("/api/profile/education", eduData)
        .then((res) => history.push("/dashboard"))
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });
        });
    },
  };
};

export const getProfileByHandle = (dispatch) => {
  return {
    onGetProfileByHandle: (handle) => {
      dispatch(setProfileLoading());
      axios
        .get(`/api/profile/handle/${handle}`)
        .then((res) => {
          dispatch({
            type: GET_PROFILE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PROFILE,
            payload: null,
          });
        });
    },
  };
};
