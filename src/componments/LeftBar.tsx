import { Menu } from 'antd';
import React from 'react'
import { Link , useLocation } from 'react-router-dom';
import { AuthRouter } from '../router';
import SubMenu from 'antd/lib/menu/SubMenu';

const LeftBar: React.FC<any> = (props) => {
    let location = useLocation();
    return (
        <Menu theme="dark"  mode="inline" defaultSelectedKeys={[location.pathname]}>
            {AuthRouter.map(r => {
                if (r.routes) {
                    return (
                        <SubMenu key={r.path} icon={r.icon} title={r.title} >
                            {r.routes.map((list) => {
                                return(
                                    <Menu.Item key={list.path} icon={list.icon}>
                                        <Link to={list.path}>{list.title}</Link>
                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={r.path} icon={r.icon}>
                            <Link to={r.path}>{r.title}</Link>
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    )
}

export default LeftBar;