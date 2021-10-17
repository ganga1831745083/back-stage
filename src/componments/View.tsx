import React, { Suspense, useEffect , useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { AuthRouter, unAuthRouter ,IRouter} from '../router';
import Applayout from '../componments/Applayout'



const View: React.FC<any> = (props) => {
    const [ary,setAry] = useState<IRouter[]>(AuthRouter)
    useEffect(() => {
        //扁平化数组
        let Temporary:any = AuthRouter
        Temporary = flatten(Temporary)
        setAry([...Temporary])
    }, [])
    function flatten(item: IRouter[]){
        let ary:IRouter[] = []
        item.map((i:IRouter)=>{
            if(i.routes){
               i.routes.map((r:IRouter)=>{
                   ary.push(r)
               })
            }else{
                ary.push(i)
            }
        })
        return ary
    }
    return (
        <>
            <Suspense fallback={<></>}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact>
                            <Redirect to={'/admin/dashboard'}></Redirect>
                        </Route>
                        <Route path='/admin'>
                            <Applayout>
                                {ary.map(r => {
                                    return (
                                        <Route
                                            path={r.path}
                                            key={r.key}
                                            exact={r.exact}
                                        >
                                            {r.component}
                                        </Route>
                                    )
                                })}
                            </Applayout>
                        </Route>
                        <Switch>
                            {unAuthRouter.map(r => {
                                return (

                                    <Route
                                        path={r.path}
                                        key={r.key}
                                        exact={r.exact}
                                    >
                                        {r.component}
                                    </Route>
                                )
                            })}
                        </Switch>
                    </Switch>
                </Router>
            </Suspense>
        </>
    )
}

export default View