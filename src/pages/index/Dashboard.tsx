import React from 'react'
import {inject,observer} from 'mobx-react'

const Dashboard:React.FC<any>=(props)=>{
    return(
        <>
            {props.userStore?.username}
        </>
    )
}
export default  inject('userStore')(observer(Dashboard)) 