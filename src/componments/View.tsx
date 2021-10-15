import React, { Suspense, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import router from '../router';

const View: React.FC<any> = (props) => {
    useEffect(() => {
        console.log(router);

    }, [])
    return (
        <>
            <Suspense fallback={<></>}>
                <Router>
                    {router.map(r => {
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
                </Router>
            </Suspense>
        </>
    )
}

export default View