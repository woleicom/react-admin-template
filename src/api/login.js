import request from '@/utils/request'
// export const sendLogin = (data)=>request({ url: `login`,method: 'post', data });
// export const sendLogout = (data)=>request({ url: `logout`,method: 'post', data });
// export const sendUserInfo = (data)=>request({ url: `userInfo`,method: 'post', data });

export const sendLogin = (data)=>new Promise((resolve)=>{
  resolve({
    code: 1,
    message: '登录成功',
    data: {
      token: data.username == 'admin'?'000000':'999999'
    }
  });
});
export const sendLogout = (data)=>new Promise((resolve)=>{
  resolve({
    code: 1,
    message: '登出成功',
    data: {}
  })
});
export const sendUserInfo = (data)=>new Promise((resolve)=>{
  let token = localStorage.getItem('token');
  let menus = require('../config/menu');
  resolve({
    code: 1,
    message: '获取用户信息成功',
    data: {
      id: 0,
      name: 'admin',
      menus: token == '000000'?menus:[menus[0]]
    }
  })
});

