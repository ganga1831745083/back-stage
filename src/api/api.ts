import request from '../utils/request';
export const login = (name:string,password:string)=>{
    return request({
        url:'/awjProject/login',
        method:'post',
        data:{user_name:name,user_password:password}
    })
}
export const register = (name:string,password:string,tel:string,Verification:string)=>{
    return request({
        url:'/awjProject/register',
        method:'post',
        data:{user_name:name,user_password:password,user_tel:tel,Verification:Verification}
    })
}

export const getUserList = (pageSize:number,current:number,sort:string)=>{
    return request({
        url:'/awjProject/user/userList',
        method:'get',
        params: {pageSize:pageSize,current:current,sort:sort}
    })
}

export const deleteUserList = (user_id:number)=>{
    return request({
        url:'/awjProject/user/deleteuserlist',
        method:'delete',
        params: {user_id:user_id}
    })
}