import React from 'react'
import {Layout} from 'antd'
import {withRouter} from 'react-router-dom';

const Test1 = (props) => {
  return (
    <Layout className='index animated fadeIn'>
      test1
    </Layout>
  )
};
export default withRouter(Test1);
