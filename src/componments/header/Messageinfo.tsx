import { Avatar, Typography, Card, Comment, Space, Popover, List } from 'antd'
import { inject, observer } from 'mobx-react'
import {
    UserOutlined,
    SettingOutlined,
    HomeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import React from 'react'
import {Storage} from '../../utils/storage'

const Messageinfo: React.FC<any> = (props) => {
    const { Text } = Typography;
    let storage = new Storage('');
    const data = [
        {
            key:'UserOutlined',
            title: '个人中心',
            ico:<UserOutlined />
        },
        {
            key:'SettingOutlined',
            title: '设置',
            ico:<SettingOutlined />
        },
        {
            key:'HomeOutlined',
            title: '主页',
            ico:<HomeOutlined />
        },
        {
            key:'LogoutOutlined',
            title: '退出登录',
            ico:<LogoutOutlined />
        }
    ];
    const handleMessage = (value:string)=>{
        if(value==='UserOutlined'){
            //点击个人中心

        }else if(value==='SettingOutlined'){
            //点击设置

        }else if(value==='HomeOutlined'){
            //点击主页

        }else if(value==='LogoutOutlined'){
            //点击推出登录
            storage.removeItem('data')
            props.userStore?.changeName('')
            window.location.href='./login'
        }
    }
    return (
        <>
            <Popover
                overlayClassName="message_popover"
                overlayStyle={{width:"120px"}}
                overlayInnerStyle={{borderRadius:"12px"}}
                trigger="click"
                placement="bottomRight"
                content={
                    <List
                        className="mesasge_list"
                        itemLayout="horizontal"
                        dataSource={data}
                        split={false}
                        
                        renderItem={item => (
                            <List.Item
                                onClick={()=>handleMessage(item.key)}
                            >
                                <List.Item.Meta
                                    avatar={item.ico}
                                    title={<Text >{item.title}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                }
            >
                <Card className='message' bordered={false} bodyStyle={{ padding: 0 }}	>
                    <Comment
                        className='user_info'
                        avatar={<Avatar gap={0} src="https://joeschmoe.io/api/v1/random" size={45} />}
                        content={
                            <Space direction="vertical" size={0} >
                                <Text strong={true}>{props.userStore?.username}</Text>
                                <Text type="secondary">普通用户</Text>
                            </Space>
                        }
                    >
 
                    </Comment>
                </Card>
            </Popover>


        </>
    )
}

export default inject('userStore')(observer(Messageinfo))