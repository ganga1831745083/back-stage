import { Button, message, Popconfirm } from 'antd'
import React from 'react'
import { IAdmin } from './UserList'
import { deleteUserList } from '../../api/api';
interface IProps {
    user: IAdmin
    upDataUser: () => void
}

const DeleteUser: React.FC<IProps> = (props) => {
    const DeleteUser = () => {
        deleteUserList(props.user.user_id).then((response)=>{
            const {code,msg} = response.data;
            if(code===0){
                message.success('删除成功')
                props.upDataUser()
            }else{
                message.warn(msg)
            }
        })  
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