import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import * as Icon from '@ant-design/icons';
import {clearPageState} from '@/utils/pageState'

// 处理 pathname
const getOpenKeys = string => {
    let newStr = '',
        newArr = [],
        arr = string.split('/').map(i => '/' + i)
    for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i]
        newArr.push(newStr)
    }
    return newArr
}

const getPathName = (pathname, menuTree,parentPath) => {
    for(let i = 0; i < menuTree.length; i++){
        //路径包含
        if(pathname.search(menuTree[i].key) === 0){
            //路径相等
            if(pathname === menuTree[i].key){
                //隐藏菜单去父路径
                if(menuTree[i].hidden){
                    return parentPath;
                }else {
                    return menuTree[i].key
                }
            } else if (menuTree[i].subs && menuTree[i].subs.length>0) {
                let str = getPathName(pathname, menuTree[i].subs ,menuTree[i].key);
                if(str !== ''){
                    return str;
                }
            }
        }
    }
    return ''
}
const CustomMenu = props => {
    //初始化
    const [openKeys,setOpenKeys] = useState([]);
    const [selectedKeys,setSelectedKeys] = useState([]);
    useEffect(() => {
        let { pathname } = props.location;
        setOpenKeys(getOpenKeys(pathname));
        setSelectedKeys([getPathName(pathname, props.menu)]);
    }, [props]);
    // 只展开一个 SubMenu
    const onOpenChange = v => {
        setOpenKeys(prevState=>{
            if (v.length === 0 || v.length === 1) {
                return v;
            }
            const latestOpenKey = v[v.length - 1]
            // 这里与定义的路由规则有关
            if (latestOpenKey.includes(v[0])) {
                return v;
            } else {
                return [latestOpenKey];
            }
        })
        
    }

    const onSelectChange = ({ key }) =>{
        clearPageState(key);
        setSelectedKeys([key]);
    };

    const renderMenuItem = ({ key, Icon, title }) => (
        <Menu.Item key={key}>
            <Link to={key}>{Icon?<Icon/>:''}<span>{title}</span></Link>
        </Menu.Item>
    )

    // 循环遍历数组中的子项 subs ，生成子级 menu
    const renderSubMenu = ({ key, Icon, title, subs }) => {
        return (
            <Menu.SubMenu
                key={key}
                title={<span>{Icon?<Icon/>:''}<span>{title}</span></span>}>
                {subs && 
                    subs.map(item => {
                        return item.subs && 
                        item.subs.length > 0 &&
                        item.subs.filter(v=>v.hidden).length!==item.subs.length ? 
                            renderSubMenu(item) : 
                            renderMenuItem(item)
                    })}
            </Menu.SubMenu>
        )
    }
    let _open_keys = props.menuToggle?{}:{openKeys:openKeys}
    return (
        <Menu
            mode='inline'
            theme={props.theme}
            defaultOpenKeys={openKeys}
            {..._open_keys}
            selectedKeys={selectedKeys}
            onClick={onSelectChange}
            onOpenChange={onOpenChange}>
            {props.menu &&
                props.menu.map(item => {
                    if (item.icon) {
                        item.Icon = Icon[item.icon]
                    }
                    return item.subs && 
                        item.subs.length > 0 &&
                        item.subs.filter(v=>v.hidden).length!==item.subs.length ? 
                            renderSubMenu(item) : 
                            renderMenuItem(item)
                })}
        </Menu>
    )
}

CustomMenu.propTypes = {
    menuToggle: PropTypes.bool.isRequired,
    menu: PropTypes.array.isRequired
}

export default withRouter(CustomMenu)
