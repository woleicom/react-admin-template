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
    // if(res.code.toString().search('9') == 0) {
    //   localStorage.removeItem('token');
    //   __history.replace("/login");
    // }
    isShowSussessMessage && message.error(res.message);
    return false;
  }
}