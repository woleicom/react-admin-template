import { SET_USER_INFO,SET_USER_TOKEN } from "../constants";

export const defaultState = {
  userInfo: JSON.parse(localStorage.getItem('user'))||{},
  token: localStorage.getItem('token')||""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      const userInfo = action.value;
      return {...state, userInfo};
    case SET_USER_TOKEN:
      const token = action.value;
      return {...state, token};
    default:
      return state;
  }
};
