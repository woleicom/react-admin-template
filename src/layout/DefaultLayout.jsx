import React, {useReducer} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import {Layout, BackTop} from 'antd'
import {$iscode,setHistory} from '@/utils/app';
import routes from '@/routes'
import avatar from '@/assets/images/user.png'
import '@/style/layout.less'
import {setAppLanguage} from '@/store/actions'
import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

import {sendLogout} from '@/api/login';

const {Content} = Layout;

const MENU_TOGGLE = 'menuToggle';

const reducer = (state, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return {...state, menuToggle: !state.menuToggle};
    default:
      return state
  }
};
//转化当前用户导航菜单权限tree为一维数组list
const getMenuList = (menuTree,menuList) => {
  for(let i = 0; i< menuTree.length; i++){
    menuList.push(menuTree[i]);
    if(menuTree[i].subs && menuTree[i].subs.length>0){
      getMenuList(menuTree[i].subs,menuList);
    }
  }
};
//获取当前用户所有可以访问的路由权限
const getRoutes = (routeList,menuTree) => {
  let menuList =[];
  getMenuList(menuTree,menuList);
  return menuList.map(v=>{
    let route = routeList.find(r => r.path === v.key);
    return route?route:false;
  }).filter(v=>!!v);
};
//返回除了首页之外的面包屑
const getBreadCrumb = (pathname,menuTree,crumb) => {
  // 首页返回false
  if(pathname === '/index') return false;
  // 递归遍历远端导航菜单tree
  for(let i = 0; i< menuTree.length; i++){
    // 符合则添加到面包屑中
    if(pathname.search(menuTree[i].key) === 0){
      if(menuTree[i].key === pathname){
        crumb.unshift(menuTree[i].title);
        return true;
      }else {
        // 不符合如果有子集继续查找
        if(menuTree[i].subs && menuTree[i].subs.length>0){
          let state = getBreadCrumb(pathname, menuTree[i].subs, crumb);
          if(state){
            crumb.unshift(menuTree[i].title);
            return true;
          }
        }
      }
    }
  }
  return false;
};

const DefaultLayout = props => {
  // 暴露history对象
  setHistory(props.history);
  const [state, dispatch] = useReducer(reducer, {menuToggle: false});

  if (props.userInfo.id === undefined) {
    return <Redirect to='/login' {...props} />
  }
  // 获取远端用户菜单权限tree
  const menu = JSON.parse(JSON.stringify(props.userInfo.menus));

  const menuClick = () => {
    dispatch({type: 'menuToggle'})
  };

  const loginOut = async () => {
    try{
      let res = await sendLogout();
      if($iscode(res,true)){
        localStorage.clear();
        props.history.push('/login');
      }
    }catch(e){
      localStorage.clear();
      props.history.push('/login');
    }
  };
  // 获取面包屑
  let breadCrumb = [];
  getBreadCrumb(props.location.pathname,menu,breadCrumb);
  // 获取权限路由
  let routesMap = getRoutes(routes,menu);
  return (
    <Layout className='app'>
      <BackTop/>
      <AppAside menuToggle={state.menuToggle} menu={menu}/>
      <Layout style={{marginLeft: state.menuToggle ? '80px' : '200px', minHeight: '100vh'}}>
        <AppHeader breadCrumb={breadCrumb} menuToggle={state.menuToggle} menuClick={menuClick} language={props.language} toggleLanguage={props.toggleLanguage} avatar={avatar} loginOut={loginOut}/>
        <Content className='content'>
          <Switch>
            {routesMap.map(item => {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  exact={item.exact}
                  render={props =><item.component {...props} />}/>
              )
            })}
            <Redirect to='/404'/>
          </Switch>
        </Content>
        <AppFooter/>
      </Layout>
    </Layout>
  )
};
export default withRouter(connect(
  (state) => ({
    userInfo: state.User.userInfo,
    language: state.App.lang,
  }),
  (dispatch) => {
    return {
      toggleLanguage(res) {
        dispatch(setAppLanguage(res));
      },
    };
  }
)(DefaultLayout))
