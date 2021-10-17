import { Header } from 'antd/lib/layout/layout'
import React from 'react'

const ViewHeader:React.FC<any>=(props)=>{
    return(
        <Header className="site-layout-background" style={{ padding: 0 ,textAlign:'center'}}>
            头部信息
        </Header>
    )
}
export default ViewHeader