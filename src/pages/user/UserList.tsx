import { Button, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import DeleteUser from './DeleteUser'
import React from 'react'

export interface IAdmin{
    id:number,//用户的id
    name:string,//用户名
    mobile:string,//手机号
    email:string//电子邮箱
}
interface IState{
    total:number,//总条数
    current:number,//当前页数
    pageSize:number,//每页显示多少条
    adminList:IAdmin[],//当前页数的数据
    loading?:boolean//是否开启节流
}

export const UserList:React.FC<any>=(ISate)=>{
    const istate:IState = {
        current:1,
        total:1,
        pageSize:10,
        adminList:[
            {id:1,name:'awj',mobile:'131',email:'2727'}
        ]
    }
    const change = (pagination:any,filters:any,sorter:any)=>{
        //pagination 分页信息数据
        // filters 筛选信息数据
        //sorter 排序信息的数据
        
    }
    const upDataUser = ()=>{

    }   
    return (
        <>
            <Table 
                dataSource={istate.adminList} 
                rowKey={'key'}
                pagination={{position:['bottomCenter'],total:istate.total,pageSize:istate.pageSize,current:istate.current,hideOnSinglePage:true,showSizeChanger:false}}//设置分页信息
                onChange={change}
                onHeaderRow={() => ({style:{textAlign: 'center'}})}
                locale={{//修改排序提示
                    cancelSort:'点击取消排序',
                    triggerAsc:'点击升序',
                    triggerDesc:'点击降序'
                }}
            >
                <Table.Column 
                    title='编号'
                    dataIndex='id'
                    key='id'
                    sorter={true}
                    width='20%'
                />
                <Table.Column 
                    title='姓名'
                    dataIndex='name'
                    key='name'
                    width='20%'
                    sorter={true}
                    showSorterTooltip={false}//是否显示排序提示
                />
                <Table.Column 
                    title='电话'
                    width='20%'
                    dataIndex='mobile'
                    key='mobile'
                />
                <Table.Column 
                    title='邮箱'
                    width='20%'
                    dataIndex='email'
                    key='email'
                />
                <Table.Column 
                    title='操作'
                    width='20%'
                    key='operation'
                    // dataIndex='email'
                    render={(user:IAdmin)=>(
                        // return(
                            <Space>
                                <Button type='primary'>编辑</Button>
                                <DeleteUser upDataUser={upDataUser} user={user}></DeleteUser>
                            </Space>
                        // )
                    )}
                />
            </Table>
        </>
    )
}
export default UserList;