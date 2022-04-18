import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.get(
      "https://api.notary.ink/api.php/records/users"
    );
    console.log(data);
    const u = data.records.find(
      (e) => e.email === email && e.password === password
    );
    console.log(u);
    if (u) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: u,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "User Not found",
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/login";
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://api.notary.ink/api.php/records/users",
      { name, email, password, avatar },
      config
    );
    const d = await axios.get(
      `https://api.notary.ink/api.php/records/users/${data}`
    );
    console.log(d);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: d.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: d.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(d.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `https://api.notary.ink/api.php/records/users/${userInfo.id}`
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo);
    const { data } = await axios.put(
      `https://api.notary.ink/api.php/records/users/${user.id}`,
      user
    );
    const d = await axios.get(
      `https://api.notary.ink/api.php/records/users/${user.id}`
    );
    console.log(d);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: d.data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: d.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(userInfo.id));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
