import Search from 'antd/lib/input/Search'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import './ViewHeader.less'
import Messageinfo from './Messageinfo'

const ViewHeader:React.FC<any>=(props)=>{
    const onSearch = (value:string)=>{
        console.log(value);
    }
    return(
        <Header className="viewHeader site-layout-background">
            <Search className='search' placeholder="跳转的标签" onSearch={onSearch} />
            <Messageinfo></Messageinfo>
        </Header>
    )
}
export default ViewHeader