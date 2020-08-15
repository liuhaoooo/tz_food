import React, { useState,useEffect,useMemo } from 'react';
import { Radio } from 'antd';
import { getFood } from '../common/api';
export default function Administration() {
    const [storeId,setStoreId] = useState(0)
    const storeInfo = useMemo(() => {
        console.log(storeId)
        let data = storeId
        return () => data
    }, [storeId])
    useEffect(() => {
        getFood({busId:1}).then(res=>{
            console.log(res)
        })
        return () => {}
    }, [])
    return (
        <>
            <div>
                <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(e)=>setStoreId(e.target.value)}>
                    <Radio.Button value="0">Hangzhou</Radio.Button>
                    <Radio.Button value="1">Shanghai</Radio.Button>
                    <Radio.Button value="2">Beijing</Radio.Button>
                    <Radio.Button value="3">Chengdu</Radio.Button>
                </Radio.Group>
            </div>
        </>
    )
}
