import React, { lazy, ReactNode } from 'react';
import {
    DashboardOutlined,
    UserOutlined,
    ApartmentOutlined
} from '@ant-design/icons';
const Login = lazy(()=>import('../pages/login/Login'))
const Register = lazy(()=>import('../pages/register/Register'))
const Page404 = lazy(()=>import('../pages/Page404'))
const Dashboard = lazy(()=>import('../pages/index/Dashboard'))
const UserList = lazy(()=>import('../pages/user/UserList'))
const SuperList = lazy(()=>import('../pages/user/SuperList'))

export interface IRouter{
    title:string,
    path:string,
    key:string,
    exact?:boolean,
    component?:ReactNode
    routes?:IRouter[],
    icon?: ReactNode
}
//认证后可见的页面
export const AuthRouter:IRouter[]=[
    {
        exact:true,
        path:'/admin/dashboard',
        title:'仪表盘',
        key:'dashboard',
        icon: <DashboardOutlined/>,
        component:<Dashboard/>
    },
    {
        exact:true,
        path:'/admin/user',
        title:'用户管理',
        key:'user',
        icon: <UserOutlined />,
        routes:[{
            exact:true,
            path:'/admin/user/list',
            title:'用户列表',
            key:'userlist',
            icon: <UserOutlined />,
            component:<UserList/>, 
        },{
             exact:true,
             path:'/admin/user/superList',
             title:'管理员列表',
             key:'superList',
            icon: <ApartmentOutlined />,
            component:<SuperList/>
        }]
    }
]
//一直可见的页面
export const unAuthRouter:IRouter[]=[
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
        path:'*',
        title:'404',
        key:'404',
        component:<Page404/>
    }
]