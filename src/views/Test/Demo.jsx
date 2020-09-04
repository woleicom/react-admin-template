import React,{ useRef, useState, useEffect} from 'react'
import {Layout,Table,Card,Input,Form,Button,Pagination, message} from 'antd'
import {withRouter} from 'react-router-dom';
import {setPageState,getPageState} from '@/utils/pageState'
import addModal from './AddModal'
import {getList} from '@/api/demo'
import {$iscode} from '@/utils/app'
const Demo = (props)=>{
  // 初始化默认筛选项数值
  let defSearch = {
    name1: '',
    name2:'',
    page: 1,
    size: 10
  }
  let form = useRef();
  // 初始化 分页信息和筛选项信息
  let [total, setTotal] = useState(0);
  let [search,setSearch] = useState(defSearch);
  // 查看是否有留存状态，有则替换
  let pageState = getPageState(props.history.location.pathname);
  if(pageState) {
    setSearch(Object.assign(search, pageState));
  }
  // 列表数据和列头配置
  let [data, setData] = useState([])
  let [listLoading, setListLoading] = useState(false);
  let columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
           <Button type="link" onClick={pageLinkChange} block>详情</Button>
        </span>
      ),
    },
  ]
  // 页面跳转
  const pageLinkChange = ()=>{
    setPageState(props.history.location.pathname,{...search})
    props.history.push({ pathname : '/demo/demo/detail' });
  }
  // 页面筛选项搜索
  const pageSearchChange = (data) => {
    setSearch({...search, ...data, page: 1})
  }
  // 页面筛选项重置
  const pageSearchReset = () => {
    form.current.setFields(Object.keys(defSearch).map(v=>({name:v, value: defSearch[v]})));
    // 重置后直接请求第一页数据
    // setSearch({...defSearch, page: 1, size: search.size});
  }
  // 分页当前页切换
  const pageCurrentChange = (page, pageSize) => {
    setSearch({...search, page: page});
  } 
  // 分页当前页显示多少条切换
  const pageSizeChange = (current, size) => {
    setSearch({...search, page: 1, page: size});
  }
  // 增加列表项模态框添加
  const actionAddModel = ()=>{
    addModal({title: '添加'}).then((res)=>{
      setData([res,...data.slice(0,-1)])
    },()=>{})
  }
  // 初始化数据
  const initData = async () => {
    setListLoading(true);
    try {
      let res = await getList(search);
      setListLoading(false);
      if ($iscode(res)) {
        setData(res.data);
        setTotal(res.total);
      } else {
        message.error(res.message)
      }
    } catch (e) {
      setListLoading(false);
    }
  }
  useEffect(()=>{
    initData();
  },[search])
  return (
    <Layout className='index animated fadeIn'>
      <Card>
        <div style={{'textAlign':'right'}}>
          <Button type="danger" onClick={actionAddModel}>添加</Button>
        </div>
        <Form
          ref={form}
          style={{'marginBottom':'10px'}}
          initialValues={search}
          onFinish={pageSearchChange}
          layout='inline'>
          <Form.Item label="筛选项1" name='name1'>
            <Input style={{width:'180px'}} placeholder="测试输入框" />
          </Form.Item>
          <Form.Item label="筛选项2" name='name2'>
            <Input style={{width:'180px'}} placeholder="测试输入框" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'>搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={pageSearchReset}>重置</Button>
          </Form.Item>
        </Form>
        <Table pagination={false} 
          loading={listLoading}
          bordered 
          rowKey='id' 
          columns={columns} 
          dataSource={data} />
        <Pagination style={{marginTop:'10px',textAlign:'right'}} 
          showQuickJumper 
          current={search.page} 
          pageSize={search.size} 
          total={total} 
          onChange={pageCurrentChange} 
          onShowSizeChange={pageSizeChange} />
      </Card>
    </Layout>
  )
}
export default withRouter(Demo);
