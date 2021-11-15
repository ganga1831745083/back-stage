import React, { Suspense, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { AuthRouter, IRouter } from '../router';
import Applayout from '../componments/Applayout'
import UserStore from '../store/UserStore'
import {inject,observer} from 'mobx-react'
import FrontendAuth from './FrontendAuth'

const View: React.FC<any> = (props) => {
    const [ary, setAry] = useState<IRouter[]>(AuthRouter)
    const [flag, setFlag] = useState<boolean>(false)
    useEffect(() => {
        //扁平化数组
        let Temporary: any = AuthRouter
        Temporary = flatten(Temporary)
        setAry([...Temporary])
        if(props.userStore?.username!=''){
            setFlag(true)
        }
    }, [])
    function flatten(item: IRouter[]) {
        let ary: IRouter[] = []
        item.map((i: IRouter) => {
            if (i.routes) {
                i.routes.map((r: IRouter) => {
                    ary.push(r)
                })
            } else {
                ary.push(i)
            }
        })
        return ary
    }
    return (
        <Router>
            <Suspense fallback={<></>}>
                <Switch>
                    <FrontendAuth routerConfig={ary}></FrontendAuth>
                </Switch>
            </Suspense>
        </Router>
        // <>
        //     <Suspense fallback={<></>}>
        //         <Router>
        //             <Switch>
                       
        //                 <Route path={'/'} exact>
        //                     <Redirect to={flag?'/admin/dashboard':'/login'}></Redirect>
        //                 </Route>
        //                 <Route path='/admin'>
        //                     <Applayout>
        //                         {ary.map(r => {
        //                             return (
        //                                 <Route
        //                                     path={r.path}
        //                                     key={r.key}
        //                                     exact={r.exact}
        //                                 >
        //                                     {r.component}
        //                                 </Route>
        //                             )
        //                         })}
        //                     </Applayout>
        //                 </Route>
        //                 <Switch>
        //                     {unAuthRouter.map(r => {
        //                         return (
        //                             <Route
        //                                 path={r.path}
        //                                 key={r.key}
        //                                 exact={r.exact}
        //                             >
        //                                 {r.component}
        //                             </Route>
        //                         )
        //                     })}
        //                 </Switch>
        //             </Switch>
        //         </Router>
        //     </Suspense>
        // </>
    )
}

export default inject('userStore')(observer(View)) 