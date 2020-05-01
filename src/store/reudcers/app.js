import { SET_APP_LANGUAGE } from "../constants";

export const defaultState = {
  lang: 'zh-CN'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_APP_LANGUAGE:
      return {...state, lang:action.value};
    default:
      return state;
  }
};
