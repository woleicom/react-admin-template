import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { setUserInfo,setUserToken } from "@/store/actions";
import { Layout, Input, Form, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {sendLogin, sendUserInfo} from '@/api/login';
import {$iscode} from '@/utils/app';
import '@/style/views/login.less'
/**
 class Login extends Component {
    static contextTypes = {
        $iscode: PropTypes.func
    }
 }

 class Login extends Component {}
 Login.contextTypes = {
    $iscode: PropTypes.func
}

const Login = (props,context)=>{}
Login.contextTypes = {
    $iscode: PropTypes.func
}
 * */
const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const handleSubmitFinish = async values => {
        setLoading(true);
        try{
            let res = await sendLogin({
                username: values.username,
                password: values.password,
            });
            setLoading(false);
            if($iscode(res,true)){
                localStorage.setItem('token', res.data.token);
                props.setUserToken(res.data.token);
                res = await sendUserInfo();
                if($iscode(res)){
                    localStorage.setItem('user', JSON.stringify(res.data));
                    props.setUserInfo(res.data);
                    props.history.push('/');
                }
            };
        }catch(e){
            setLoading(false);
        };
    };
    
    const handleSubmitFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Layout className='login animated fadeIn'>
            <div className='model'>
                <div className='login-form'>
                    <h3>后台管理系统</h3>
                    <Divider />
                    <Form
                        onFinish={handleSubmitFinish}
                        onFinishFailed={handleSubmitFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input
                                placeholder='用户名'
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="密码"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
export default withRouter(connect(
    (state) => ({}),
    (dispatch) => {
      return {
        setUserInfo(res) {
          dispatch(setUserInfo(res));
        },
        setUserToken(res) {
            dispatch(setUserToken(res));
        },
      };
    }
  )(Login));