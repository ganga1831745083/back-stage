import { Space } from 'antd'
import React from 'react'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
const DashboardMap: React.FC<any> = (props) => {
    return (
        <Space className='dashboard_Map'>
            <Map center={{ lng: 115.861834, lat: 28.783346 }} zoom="11" >
                <Marker position={{ lng: 115.861834, lat: 28.783346 }} />
                <NavigationControl />
                {/* <InfoWindow position={{ lng: 116.402544, lat: 39.928216 }} text="内容" title="某地" /> */}
            </Map>
        </Space>
    )
}
export default DashboardMap