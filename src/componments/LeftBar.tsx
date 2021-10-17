import { Menu } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { AuthRouter } from '../router';
import SubMenu from 'antd/lib/menu/SubMenu';

const LeftBar: React.FC<any> = (props) => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[AuthRouter[0].key]}>
            {AuthRouter.map(r => {
                if (r.routes) {
                    return (
                        <SubMenu key={r.key} icon={r.icon} title={r.title}>
                            {r.routes.map((list) => {
                                return(
                                    <Menu.Item key={list.key} icon={r.icon}>
                                        <Link to={list.path}>{list.title}</Link>
                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={r.key} icon={r.icon}>
                            <Link to={r.path}>{r.title}</Link>
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    )
}

export default LeftBar;