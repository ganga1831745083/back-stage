import request from '../utils/request';
export const login = (name:string,password:string)=>{
    return request({
        url:'/awjProject/login',
        method:'post',
        data:{user_name:name,user_password:password}
    })
}