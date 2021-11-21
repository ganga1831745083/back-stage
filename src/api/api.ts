import request from '../utils/request';
export const login = (name:string,password:string)=>{
    return request({
        url:'/awjProject/login',
        method:'post',
        data:{user_name:name,user_password:password}
    })
}
export const register = (name:string,password:string,tel:string,Verification:string,email:string)=>{
    return request({
        url:'/awjProject/register',
        method:'post',
        data:{user_name:name,user_password:password,user_tel:tel,Verification:Verification,user_email:email}
    })
}

export const getUserList = (pageSize:number,current:number,sort:string,user_name:string,user_id:string,user_tel:string,user_email:string)=>{
    let search_key='',search_value = ''
    if(user_name!==''){
        search_key = "user_name"
        search_value = user_name
    }else if(user_id!==''){
        search_key = "user_id"
        search_value = user_id
    }else if(user_tel!==''){
        search_key = "user_tel"
        search_value = user_tel
    }else if(user_email!==''){
        search_key = "user_email"
        search_value = user_email
    }
    return request({
        url:'/awjProject/user/userList',
        method:'get',
        params: {pageSize:pageSize,current:current,sort:sort,search_key:search_key,search_value:search_value}
    })
}

export const deleteUserList = (user_id:number)=>{
    return request({
        url:'/awjProject/user/deleteuserlist',
        method:'delete',
        params: {user_id:user_id}
    })
}