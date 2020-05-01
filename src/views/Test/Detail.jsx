import React from 'react'
import {Layout,Button} from 'antd'
import {withRouter} from 'react-router-dom';

const Detail = (props) => {
  return (
    <Layout className='index animated fadeIn'>
      detail
      <Button onClick={()=>{props.history.go(-1)}}>返回上一页</Button>
    </Layout>
  )
};
export default withRouter(Detail);
