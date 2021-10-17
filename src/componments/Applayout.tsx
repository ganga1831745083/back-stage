import { Layout } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useState } from 'react'
import LeftBar from './LeftBar';
import './Applayout.less'

const Applayout: React.FC<any> = (props) => {
    const [flag, setFlag] = useState<boolean>(false)
    return (
        <Layout className='ant-layout-has-sider ApplayoutBox'>
            <Sider trigger={null} collapsible collapsed={flag}>
                <div className="logo" />
                <LeftBar />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(flag ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => { setFlag(!flag) },
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}
export default Applayout