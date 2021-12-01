import React from 'react'
import { Card, Space, Typography } from 'antd'
import {
    SettingOutlined,
    HomeOutlined,
    SafetyOutlined,
    ShoppingCartOutlined

} from '@ant-design/icons';
const DashboardHeader:React.FC<any>=(props)=>{
    const { Text } = Typography;
    return(
        <Space className='dashboard_header' >
                <Card className='dashboard_header_card border_left_blue'>
                    <Space>
                        <Space className='dashboard_header_card_content' direction="vertical" size={0}>
                            <Text className='dashboard_header_card_content_title'>用户人数</Text>
                            <Text className='dashboard_header_card_content_num blueColor'>4805</Text>
                            <Text className='dashboard_header_card_content_growth'>较上周下跌2.5%</Text>
                        </Space>
                        <ShoppingCartOutlined className='dashboard_header_card_ico background_blue' />
                    </Space>
                </Card>
                <Card className='dashboard_header_card border_left_pink'>
                    <Space>
                        <Space className='dashboard_header_card_content' direction="vertical" size={0}>
                            <Text className='dashboard_header_card_content_title'>访问数量</Text>
                            <Text className='dashboard_header_card_content_num pinkColor'>4805</Text>
                            <Text className='dashboard_header_card_content_growth'>较上周下跌2.5%</Text>
                        </Space>
                        <SafetyOutlined className='dashboard_header_card_ico background_pink' />
                    </Space>
                </Card>
                <Card className='dashboard_header_card border_left_green'>
                    <Space>
                        <Space className='dashboard_header_card_content' direction="vertical" size={0}>
                            <Text className='dashboard_header_card_content_title'>模板数量</Text>
                            <Text className='dashboard_header_card_content_num greenColor'>4805</Text>
                            <Text className='dashboard_header_card_content_growth'>较上周下跌2.5%</Text>
                        </Space>
                        <SettingOutlined className='dashboard_header_card_ico background_green' />
                    </Space>
                </Card>
                <Card className='dashboard_header_card border_left_yellow'>
                    <Space>
                        <Space className='dashboard_header_card_content' direction="vertical" size={0}>
                            <Text className='dashboard_header_card_content_title'>捐赠金额</Text>
                            <Text className='dashboard_header_card_content_num yellowColor'>4805</Text>
                            <Text className='dashboard_header_card_content_growth'>较上周下跌2.5%</Text>
                        </Space>
                        <HomeOutlined className='dashboard_header_card_ico background_yellow' />
                    </Space>
                </Card>
            </Space>
    )
}
export default DashboardHeader