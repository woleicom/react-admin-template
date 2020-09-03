import axios from 'axios'
import { message } from 'antd'
const service = axios.create({
  baseURL: 'http://localhost:3333/api/',
  timeout: 10000, 
  headers:{
      post:{
          'Content-Type':'application/json;charset=utf-8'
      }
  }
})

service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem('token') || '';
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res;
  },
  (error) => {
    if (error.response.data.statusCode === 400) {
      let msg = error.response.data.message.map(v => {
        let m = [];
        for(let key in v.constraints) {
          m.push(v.constraints[key]);
        }
        return m;
      });
      let msgString = '';
      msg.forEach(v=>{
        v.forEach(x => {
          msgString += x + "|";
        })
      })
      message.error({
        content:msgString.slice(0,-1),
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.log('err' + error) // for debug
      if(error.toString().search('timeout')>-1) {
        message.error('请求超时，请重试或联系管理员');
      } if (error.toString().search('Network Error')> -1) {
        message.error('请连接网络');
      } else {
        // 其他未知错误不提示
        message.error({
          content: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)
let ser = (config)=>{
  return service(config);
}
export default ser
