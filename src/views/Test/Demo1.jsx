import React,{Component} from 'react'
import {Layout,Table,Card,Input,Button} from 'antd'
import {withRouter} from 'react-router-dom';
import {setPageState,getPageState} from '@/utils/pageState'
class Demo1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      columns:[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
               <Button type="link" onClick={this.pageLinkChange} block>详情</Button>
            </span>
          ),
        },
      ],
      data:[
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    }
    
  }

  componentWillMount(){
    this.pageInitState();
  }
  pageInitState = ()=>{
    let pageState = getPageState(this.props.history.location.pathname);
    console.log(pageState);
    if(pageState) {
      this.setState({
        name:pageState.name
      })
    }
  }
  pageLinkChange = ()=>{
    setPageState(this.props.history.location.pathname,{
      name:this.state.name
    })
    this.props.history.push({ pathname : '/demo/demo1/detail' });
  }
  render() {
    return (
      <Layout className='index animated fadeIn'>
        <Card>
          <Input value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="测试输入框" />
          <Table columns={this.state.columns} dataSource={this.state.data} />
        </Card>
      </Layout>
    )
  }
};
const Demo = (props) => {
  return <Demo1 {...props}></Demo1>
}
export default withRouter(Demo);
