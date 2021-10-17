import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useState } from 'react'
import LeftBar from './LeftBar';
import ViewHeader from './header/ViewHeader'
import ViewFooter from './footer/ViewFooter'
import './Applayout.less'

const Applayout: React.FC<any> = (props) => {
    return (
        <Layout className='ant-layout-has-sider ApplayoutBox'>
            <Sider trigger={null} collapsible>
                <div className="logo" />
                <LeftBar />
            </Sider>
            <Layout className="site-layout">
                <ViewHeader></ViewHeader>
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
                <ViewFooter></ViewFooter>
            </Layout>
        </Layout>
    )
}
export default Applayout