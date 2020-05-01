import { SET_USER_INFO,SET_USER_TOKEN } from "../constants";

export const setUserInfo = (res) => {
  return (dispatch) => {
    const arr = {
      type: SET_USER_INFO,
      value: res,
    };
    dispatch(arr);
  };
};
export const setUserToken = (res) => {
  return (dispatch) => {
    const arr = {
      type: SET_USER_TOKEN,
      value: res,
    };
    dispatch(arr);
  };
};

