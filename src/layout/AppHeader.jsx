import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Layout, Avatar,message } from 'antd'
import { GlobalOutlined,ArrowsAltOutlined,ShrinkOutlined, EditOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined,UserOutlined } from '@ant-design/icons';
import HeaderBreadcrumb from './HeaderBreadcrumb';
import screenfull from 'screenfull';
import {langKeys} from '@/lang'
const { Header } = Layout

const AppHeader = props => {
    let [isscreenfull,setIsscreenfull] = useState(false);
    let { menuClick, avatar, menuToggle, loginOut } = props
    const menu = (
        <Menu>
            <Menu.ItemGroup title='用户设置'>
                <Menu.Divider />
                <Menu.Item>
                    <EditOutlined />
                    个人设置
                </Menu.Item>
                <Menu.Item>
                    <SettingOutlined />
                    系统设置
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item>
                <div onClick={loginOut}>
                    <LogoutOutlined /> 退出登录
                </div>
            </Menu.Item>
        </Menu>
    )
    const screenfullChange = ()=>{
        if (!screenfull.isEnabled) {
            message.warning('你的浏览器不支持全屏');
            return false
        }
        setIsscreenfull(!isscreenfull);
        screenfull.toggle()
    }
    const toggleLanguageChange = (lang)=>{
        props.toggleLanguage(lang);
    }
    return (
        <Header className='header'>
            <div className='left'>
                {
                    menuToggle
                    ? <MenuUnfoldOutlined onClick={menuClick}/>
                    : <MenuFoldOutlined onClick={menuClick}/>
                }
                <div style={{marginLeft:"10px"}} >
                    <HeaderBreadcrumb arr={props.breadCrumb}></HeaderBreadcrumb>
                </div>
            </div>
            <div className='right'>
                <div className='mr15'  onClick={screenfullChange}>
                    {isscreenfull?<ShrinkOutlined />:<ArrowsAltOutlined />}
                </div>
                <div className='mr15' style={{'cursor':'pointer'}}>
                    <Dropdown
                        overlay={(
                            <Menu>
                                {langKeys.map(v=><Menu.Item 
                                    disabled={props.language === v.value} 
                                    onClick={()=>{toggleLanguageChange(v.value)}}
                                >{v.label}</Menu.Item>)}
                            </Menu>
                        )}
                    >
                       <div>
                            <GlobalOutlined />
                       </div>
                    </Dropdown>
                </div>
                <div>
                    <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
                        <div className='ant-dropdown-link'>
                            <Avatar icon={<UserOutlined/>} src={avatar} alt='avatar' style={{ cursor: 'pointer' }} />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

AppHeader.propTypes = {
    menuClick: PropTypes.func,
    avatar: PropTypes.string,
    menuToggle: PropTypes.bool,
    loginOut: PropTypes.func
}

export default AppHeader
