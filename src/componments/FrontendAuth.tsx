
import React, { useState ,useEffect, ReactNode} from "react";
import { Route, Redirect } from "react-router-dom";
import Applayout from '../componments/Applayout'
import {inject,observer} from 'mobx-react'
interface routerMessage{
  ifRedirect:boolean,
  path:string,
  component?:any,
  exact?:boolean,
  auth:boolean
}
// import IRouter from '../router';
const FrontendAuth: React.FC<any> = (props) => {
    let { routerConfig, location } = props;
    const { pathname } = location;
    const [structure,setStructure] = useState<routerMessage>({ifRedirect:false,path:'/login',auth:false})
    let isLogin = false
    function flatten(item: any) {
      let ary: any = []
      item.map((i: any) => {
          if (i.routes) {
              i.routes.map((r: any) => {
                  ary.push(r)
              })
          } else {
              ary.push(i)
          }
      })
      return ary
  }
  routerConfig = flatten(routerConfig)
    useEffect(()=>{
      if(props.userStore?.username!=''){
        isLogin = true
      }
      console.log(props.userStore?.username,isLogin);
      
      const targetRouterConfig = routerConfig.find(
        (item:any) => item.path === pathname
      );
      //不需要权限，且登录状态
      if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
        const { component ,auth} = targetRouterConfig;
        setStructure({
          ifRedirect:false,
          path:pathname,
          exact:true,
          component:component,
          auth:auth
        })
        return
      }
      if (isLogin) {
        // 如果是登陆状态，想要跳转到登陆，重定向到主页
        if (pathname === "/login" || pathname=== '/register') {
          setStructure({
            ifRedirect:true,
            path:'/admin/dashboard',
            auth:true
          })
          return
          // return <Redirect to="/admin/dashboard" />;
        }if(pathname === '/'){
          setStructure({
            ifRedirect:true,
            path:'/admin/dashboard',
            auth:true
          })
          return
          // return <Redirect to="/admin/dashboard'" />;
        } else {
          // 如果路由合法，就跳转到相应的路由
          if (targetRouterConfig) {
            setStructure({
              ifRedirect:false,
              path:pathname,
              component:targetRouterConfig.component,
              exact:false,
              auth:targetRouterConfig.auth
            })
            return
            // return (
            //   <Route path={pathname} component={targetRouterConfig.component} />
            // );
          } else {
            setStructure({
              ifRedirect:true,
              path:"/404",
              auth:false
            })
            return
            // 如果路由不合法，重定向到 404 页面
            // return <Redirect to="/404" />;
          }
        }
      } else {
        // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
        if (targetRouterConfig && targetRouterConfig.auth) {
          setStructure({
            ifRedirect:true,
            path:"/login",
            auth:false
          })
          return
          // return <Redirect to="/login" />;
        } else {
          // 非登陆状态下，路由不合法时，重定向至 404
          setStructure({
            ifRedirect:true,
            path:"/login",
            auth:false
          })
          return
          // return <Redirect to="/404" />;
        }
      }
    },[props.location])
    // 如果该路由不用进行权限校验，登录状态下登陆页除外
    // 因为登陆后，无法跳转到登陆页
    // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
    // if(structure.ifRedirect){
    //   return(
    //     <>
    //       <p></p>
    //     </>
    //   )
    // }else{

    // }
    return(
      <>
      {
        structure.ifRedirect?
        <Redirect to={structure.path} />:
        structure.exact?structure.auth?
        <Applayout><Route exact path={structure.path}>{structure.component}</Route></Applayout>:
        <Route exact path={structure.path}>{structure.component}</Route>:
        structure.auth?
        <Applayout><Route path={structure.path}>{structure.component}</Route></Applayout>:<Route path={structure.path}>{structure.component}</Route>
      }
      </>
    )
}
export default  inject('userStore')(observer(FrontendAuth)) 