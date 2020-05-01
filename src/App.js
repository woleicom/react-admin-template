import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from './utils/loadable';
import { connect } from "react-redux";
import I18nProvider from './lang/I18nProvider'
import 'animate.css'
import './style/base.less'
import './style/App.less'


// 公共模块
const DefaultLayout = loadable(() => import('./layout'));

// 基础页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */'./views/Others/404'));
const View500 = loadable(() => import(/* webpackChunkName: '500' */'./views/Others/500'));
const Login = loadable(() => import(/* webpackChunkName: 'login' */'./views/Login'));

class App extends Component {
  render() {
    console.log(process.env);
    return (
      <I18nProvider language={this.props.language}>
        <Router>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='/index' />} />
            <Route path='/500' component={View500} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={View404} />
            <Route component={DefaultLayout} />
          </Switch>
        </Router>
      </I18nProvider>
    )
  }
};
export default connect(
  (state) => ({
    language: state.App.lang
  }),
)(App)
