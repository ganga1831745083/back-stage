import React from 'react'
import UserStore from '../../store/UserStore'
import {inject,observer} from 'mobx-react'
import { Button } from 'antd'
interface IProps{
    userStore?:UserStore
}



const SuperList:React.FC<IProps>=(props)=>{
    const changeName = ()=>{
        props.userStore?.changeName("lee")
    }
    return (
        <>
            {props.userStore?.username}
            <Button onClick = {changeName} type='primary'>change</Button>
        </>
    )
}

export default inject('userStore')(observer(SuperList)) 