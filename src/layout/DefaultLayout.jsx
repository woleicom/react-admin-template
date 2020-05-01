import React, {useReducer} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import {Layout, BackTop} from 'antd'
import {$iscode} from '@/utils/app';
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

const getMenuList = (menuTree,menuList) => {
  for(let i = 0; i< menuTree.length; i++){
    menuList.push(menuTree[i]);
    if(menuTree[i].subs && menuTree[i].subs.length>0){
      getMenuList(menuTree[i].subs,menuList);
    }
  }
};
const getRoutes = (routeList,menuTree) => {
  let menuList =[];
  getMenuList(menuTree,menuList);
  return menuList.map(v=>{
    let route = routeList.find(r => r.path === v.key);
    return route?route:false;
  }).filter(v=>!!v);
};

const getBreadCrumb = (pathname,menuTree,crumb) => {
  if(pathname === '/index') return false;
  for(let i = 0; i< menuTree.length; i++){
    if(pathname.search(menuTree[i].key) === 0){
      if(menuTree[i].key === pathname){
        crumb.unshift(menuTree[i].title);
        return true;
      }else {
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
  
  const [state, dispatch] = useReducer(reducer, {menuToggle: false});

  if (props.userInfo.id === undefined) {
    return <Redirect to='/login' {...props} />
  }
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
  let breadCrumb = [];
  getBreadCrumb(props.location.pathname,menu,breadCrumb);
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
