import {message} from 'antd';
export const $iscode = (res, isShowSussessMessage)=>{
  if(res.code === 1){
    isShowSussessMessage && message.success(res.message);
    return true;
  } else {
    isShowSussessMessage && message.error(res.message);
    return false;
  }
}