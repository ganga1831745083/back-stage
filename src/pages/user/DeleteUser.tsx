import { Button, message, Popconfirm } from 'antd'
import React from 'react'
import { IAdmin } from './UserList'

interface IProps {
    user: IAdmin
    upDataUser: () => void
}

const DeleteUser: React.FC<IProps> = (props) => {
    const DeleteUser = () => {
        //调用接口删除用户
        message.success('删除成功')
        props.upDataUser()
    }
    const cancel = () => {
        message.info('取消删除')
    }
    return (
        <>
            <Popconfirm title='删除用户' onConfirm={() => DeleteUser()} onCancel={() => cancel()}>
                <Button type="primary" danger>删除</Button>
            </Popconfirm>
        </>
    )
}
export default DeleteUser