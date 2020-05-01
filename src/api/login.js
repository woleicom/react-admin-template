import request from '@/utils/request'
export const sendLogin = (data)=>request({ url: `login`,method: 'post', data });
export const sendLogout = (data)=>request({ url: `logout`,method: 'post', data });
export const sendUserInfo = (data)=>request({ url: `userInfo`,method: 'post', data });