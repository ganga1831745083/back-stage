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