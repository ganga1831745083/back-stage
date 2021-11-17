import { Button, message, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import DeleteUser from './DeleteUser'
import React,{useEffect , useState} from 'react'
import { getUserList } from '../../api/api';
export interface IAdmin{
    user_id:number,//用户的id
    user_name:string,//用户名
    user_tel:string,//手机号
    user_email?:string,//电子邮箱
}
interface IState{
    total:number,//总条数
    current:number,//当前页数
    pageSize:number,//每页显示多少条
    adminList:IAdmin[],//当前页数的数据
    loading?:boolean,//是否开启节流
    sort:string
}

export const UserList:React.FC<any>=(ISate)=>{
    const [istate,setIstat] = useState<IState>({
        current:1,
        total:1,
        pageSize:10,
        adminList:[],
        sort:'user_id asc'
    })
    
    useEffect(()=>{
        upDataUser()
    },[istate.current,istate.pageSize,istate.sort]) //当前页数，每页显示多少条 ， 排序改变是调用
    const change = (pagination:any,filters:any,sorter:any)=>{
        //pagination 分页信息数据
        // filters 筛选信息数据
        //sorter 排序信息的数据
        if(pagination.current === istate.current && pagination.pageSize === istate.pageSize){
            //没有调整分页
            let str = ''
            if(sorter.order==="descend"){
                str = sorter.field+' DESC'
            }else{
                str = sorter.field+' ASC'
            }
            setIstat({
                current:istate.current,
                total:istate.total,
                pageSize:istate.pageSize,
                adminList:istate.adminList,
                sort:str
            })
        }else{
            //调整分页
            setIstat({
                current:pagination.current,
                total:pagination.total,
                pageSize:pagination.pageSize,
                adminList:istate.adminList,
                sort:istate.sort
            })
        }
        console.log(pagination,filters,sorter);
        
    }
    const upDataUser = ()=>{
        getUserList(istate.pageSize,istate.current,istate.sort).then((response:any)=>{
            const {code,msg,data} = response.data;
            if(code === 0){
                setIstat({
                    current:istate.current,
                    total:data.total,
                    pageSize:istate.pageSize,
                    adminList:data.data,
                    sort:istate.sort
                })
            }else{
                message.error(msg)
            }
        })
    }   
    return (
        <>
            <Table 
                dataSource={istate.adminList} 
                rowKey={a=>a.user_id}
                pagination={{position:['bottomCenter'],total:istate.total,pageSize:istate.pageSize,current:istate.current,hideOnSinglePage:true,showSizeChanger:false,}}//设置分页信息
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