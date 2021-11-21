import { Button, Form, message, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import DeleteUser from './DeleteUser'
import React, { useEffect, useState } from 'react'
import { getUserList } from '../../api/api';
import Search from 'antd/lib/input/Search';
export interface IAdmin {
    user_id: number,//用户的id
    user_name: string,//用户名
    user_tel: string,//手机号
    user_email?: string,//电子邮箱
}
interface IState {
    total: number,//总条数
    current: number,//当前页数
    pageSize: number,//每页显示多少条
    adminList: IAdmin[],//当前页数的数据
    loading?: boolean,//是否开启节流
    sort: string,
    user_name:string,
    user_id:string,
    user_tel:string,
    user_email:string
}

export const UserList: React.FC<any> = (ISate) => {
    const [istate, setIstat] = useState<IState>({
        current: 1,
        total: 1,
        pageSize: 10,
        adminList: [],
        sort: 'user_id asc',
        user_name:'',
        user_id:'',
        user_tel:'',
        user_email:''
    })

    useEffect(() => {
        upDataUser()
    }, [istate.current, istate.pageSize, istate.sort ,istate.user_id,istate.user_name, istate.user_tel, istate.user_email]) //当前页数，每页显示多少条 ， 排序改变是调用
    const change = (pagination: any, filters: any, sorter: any) => {
        //pagination 分页信息数据
        // filters 筛选信息数据
        //sorter 排序信息的数据
        if (pagination.current === istate.current && pagination.pageSize === istate.pageSize) {
            //没有调整分页
            let str = ''
            if (sorter.order === "descend") {
                str = sorter.field + ' DESC'
            } else {
                str = sorter.field + ' ASC'
            }
            setIstat({
                current: istate.current,
                total: istate.total,
                pageSize: istate.pageSize,
                adminList: istate.adminList,
                sort: str,
                user_name:istate.user_name,
                user_id:istate.user_id,
                user_tel:istate.user_tel,
                user_email:istate.user_email
            })
        } else {
            //调整分页
            setIstat({
                current: pagination.current,
                total: pagination.total,
                pageSize: pagination.pageSize,
                adminList: istate.adminList,
                sort: istate.sort,
                user_name:istate.user_name,
                user_id:istate.user_id,
                user_tel:istate.user_tel,
                user_email:istate.user_email
            })
        }
    }
    const upDataUser = () => {
        getUserList(istate.pageSize, istate.current, istate.sort, istate.user_name, istate.user_id, istate.user_tel, istate.user_email).then((response: any) => {
            const { code, msg, data } = response.data;
            if (code === 0) {
                setIstat({
                    current: istate.current,
                    total: data.total,
                    pageSize: istate.pageSize,
                    adminList: data.data,
                    sort: istate.sort,
                    user_name:istate.user_name,
                    user_id:istate.user_id,
                    user_tel:istate.user_tel,
                    user_email:istate.user_email
                })
            } else {
                message.error(msg)
            }
        })
    }
    const onSearch = (value: string,keyName:string) => {
        let searchMessage={ user_name:'',
            user_id:'',
            user_tel:'',
            user_email:''}
        if(value!==''){
            if(keyName==='user_name'){
                searchMessage.user_name=value
            }else if(keyName==='user_id'){
                searchMessage.user_id=value
            }else if(keyName==='user_tel'){
                searchMessage.user_tel=value
            }else if(keyName==='user_email'){
                searchMessage.user_email=value
            }
            setIstat({
                current: istate.current,
                total: istate.total,
                pageSize: istate.pageSize,
                adminList: istate.adminList,
                sort: istate.sort,
                user_name:searchMessage.user_name,
                user_id:searchMessage.user_id,
                user_tel:searchMessage.user_tel,
                user_email:searchMessage.user_email
            })
        }
    }
    return (
        <>
            <Form
                layout="inline"
                className="components-table-demo-control-bar"
            >
                <Form.Item label='&nbsp;&nbsp;&nbsp;&nbsp;编号' name='user_id'>
                    <Search placeholder="请输入编号" onSearch={(value)=>onSearch(value,"user_id")} style={{ width: 200 ,marginBottom:16}} />
                </Form.Item>
                <Form.Item label='用户名' name='user_name'>
                    <Search placeholder="请输入用户名" onSearch={(value)=>onSearch(value,"user_name")} style={{ width: 200 ,marginBottom:16}} />
                </Form.Item>
                <Form.Item label='&nbsp;&nbsp;&nbsp;&nbsp;电话' name='user_tel'>
                    <Search placeholder="请输入用户名" onSearch={(value)=>onSearch(value,"user_tel")} style={{ width: 200 ,marginBottom:16}} />
                </Form.Item>
                <Form.Item label='&nbsp;&nbsp;&nbsp;&nbsp;邮箱' name='user_emil'>
                    <Search placeholder="请输入邮箱" onSearch={(value)=>onSearch(value,"user_emil")} style={{ width: 200 ,marginBottom:16}} />
                </Form.Item>
            </Form>
            <Table
                dataSource={istate.adminList}
                rowKey={a => a.user_id}
                pagination={{ position: ['bottomCenter'], total: istate.total, pageSize: istate.pageSize, current: istate.current, hideOnSinglePage: true, showSizeChanger: false, }}//设置分页信息
                onChange={change}
                onHeaderRow={() => ({ style: { textAlign: 'center' } })}
                locale={{//修改排序提示
                    cancelSort: '点击取消排序',
                    triggerAsc: '点击升序',
                    triggerDesc: '点击降序'
                }}
            >
                <Table.Column
                    title='编号'
                    dataIndex='user_id'
                    key='user_id'
                    sorter={true}
                    width='20%'
                />
                <Table.Column
                    title='姓名'
                    dataIndex='user_name'
                    key='user_name'
                    width='20%'
                    showSorterTooltip={false}//是否显示排序提示
                />
                <Table.Column
                    title='电话'
                    width='20%'
                    dataIndex='user_tel'
                    key='user_tel'
                />
                <Table.Column
                    title='邮箱'
                    width='20%'
                    dataIndex='user_email'
                    key='user_email'
                />
                <Table.Column
                    title='操作'
                    width='20%'
                    key='operation'
                    render={(user: IAdmin) => (
                        <Space>
                            <Button type='primary'>编辑</Button>
                            <DeleteUser upDataUser={upDataUser} user={user}></DeleteUser>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}
export default UserList;