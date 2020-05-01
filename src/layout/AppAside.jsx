import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import SliderMenu from './SliderMenu'
import Logo from '@/assets/images/logo.svg'

const { Sider } = Layout

const AppAside = props => {
    let { menuToggle, menu } = props
    let theme = 'light';
    return (
        <Sider theme={theme} className='aside' collapsed={menuToggle}>
            <div className='logo'>
                <a rel='noopener noreferrer' href='/'>
                    <img src={Logo} alt=""/> 
                    {menuToggle?'':<span className='ml15'>Ant Design</span>}
                </a>
            </div>
            <SliderMenu menuToggle={menuToggle} theme={theme} menu={menu}></SliderMenu>
        </Sider>
    )
}

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
}

export default AppAside
