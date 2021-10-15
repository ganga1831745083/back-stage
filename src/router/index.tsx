import React, { lazy, ReactNode } from 'react';

const Login = lazy(()=>import('../pages/login/Login'))
const Register = lazy(()=>import('../pages/register/Register'))
const Page404 = lazy(()=>import('../pages/Page404'))
interface IRouter{
    title:string,
    path:string,
    key:string,
    exact:boolean,
    component:ReactNode
    children?:IRouter[]
}

const router:IRouter[]=[
    {
        exact:true,
        path:'/login',
        title:'登录',
        key:'login',
        component:<Login/>
    },
    {
        exact:true,
        path:'/register',
        title:'注册',
        key:'register',
        component:<Register/>
    },
    {
        exact:true,
        path:'*',
        title:'404',
        key:'404',
        component:<Page404/>
    }
]
export default router