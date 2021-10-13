import React, { lazy, ReactNode } from 'react';

const Login = lazy(()=>import('../pages/login/Login'))
interface IRouter{
    title:string,
    path:string,
    component:ReactNode
    children?:IRouter[]
}

const router:IRouter[]=[]
export default router