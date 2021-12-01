import React from 'react'
import { inject, observer } from 'mobx-react'
import { Space } from 'antd'
import DashboardBody from './DashboardBody'
import DashboardHeader from './DashboardHeader'
import DashboardMap from './DashbordMap'
import './dashboard.less'

const Dashboard: React.FC<any> = (props) => {
    
    return (
        <Space className='dashboard_box' direction="vertical">
            {/* 头部 */}
            <DashboardHeader></DashboardHeader>
            {/* 图标显示访问人数 和用户数量 */}
            {/* 评价比例 */}
            <DashboardBody></DashboardBody>
            <DashboardMap></DashboardMap>
        </Space>
    )
}
export default inject('userStore')(observer(Dashboard))