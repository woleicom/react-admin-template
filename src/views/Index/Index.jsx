import React from 'react'
import {Layout,DatePicker} from 'antd'
import {withRouter} from 'react-router-dom';
import t from '@/lang/t'
const Index = (props) => {
  return (
    <Layout className='index animated fadeIn'>
      {t('welcome')}
      <DatePicker style={{width:'200px'}}/>
    </Layout>
  )
};
export default withRouter(Index)
