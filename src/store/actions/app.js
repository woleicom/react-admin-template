
import { SET_APP_LANGUAGE } from "../constants";

export const setAppLanguage = (res) => {
  return (dispatch) => {
    const arr = {
      type: SET_APP_LANGUAGE,
      value: res,
    };
    dispatch(arr);
  };
};