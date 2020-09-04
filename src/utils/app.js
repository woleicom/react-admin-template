import {message} from 'antd';
let __history;
export const setHistory = (history)=>{
  __history = history;
}
export const getHistory = ()=>{
  return __history;
}
export const $iscode = (res, isShowSussessMessage)=>{
  if(res.code === 1){
    isShowSussessMessage && message.success(res.message);
    return true;
  } else {
    isShowSussessMessage && message.error(res.message);
    return false;
  }
}