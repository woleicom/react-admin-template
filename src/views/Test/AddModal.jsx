import React, {Component, useEffect, useRef } from 'react'
import { Modal,Form,Button,Input } from 'antd'
import {addDemo} from '@/api/demo'
import {$iscode} from '@/utils/app'
const Index = (props) => {
  const form = useRef();
  const layout = {
    labelCol: {
      flex: "0 0 100px",
    },
    // wrapperCol: {
    //   flex: "auto"
    // }
  };
  useEffect(()=>{
    props.init(form.current)
  },[])
  return (
    <div>
      <Form
        {...layout}
        ref={form}
        name="basic"
        initialValues={props.data}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='姓名'
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="地址"
          name="address"
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="内联布局" style={{ marginBottom: 0 }}>
          <Form.Item
            name="year"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="测试内敛1" />
          </Form.Item>
          <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: '50%', margin: '0 0 0 8px' }}
          >
            <Input placeholder="测试内敛2" />
          </Form.Item>
      </Form.Item>
      </Form>
    </div>
  )
}
export default (props)=>{
  let pro_res,pro_rej;
  let pro = new Promise((resolve, reject)=>{
    pro_res = resolve;
    pro_rej = reject;
  });
  let form;
  const init = (f)=>{
    form = f;
  }
  Modal.confirm({
    width: '60%',
    maskClosable:false,
    title:'',
    okText: '确定',
    ...props,
    style:{...props.style,minWidth:'300px'},
    centered: false, // 不设置居中，否则min-width无效
    content: (<Index data={props.data||{}} init={init} ></Index>),
    icon: '',
    footer: null,
    onCancel: (close)=>{
      pro_rej(false)
      close();
    },
    onOk: (close)=>{
      return new Promise((resolve,reject)=>{
        let data = form.getFieldsValue();
        form.validateFields(Object.keys(data)).then(async (values)=>{
          try {
            let res = await addDemo(values);
            if ($iscode(res, true)) {
              pro_res(res.data)
              resolve()
            } else {
              reject()
            }
          } catch(e) {
            reject()
          }
        }).catch((error)=>{
          reject()
          console.warn(error);
        });
        
      })
    }
  })
  return pro;
} 