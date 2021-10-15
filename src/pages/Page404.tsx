import { Button, Result } from 'antd';
import {withRouter} from 'react-router-dom'
import React from 'react';

const Page404: React.FC<any> = (props) => {
    const backHome = ()=>{
        props.history.push('/')
    }
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="很抱歉，你访问的页面不存在！"
                extra={<Button type="primary" onClick={backHome}>回到首页</Button>}
            />
        </>
    )
}
export default withRouter(Page404)