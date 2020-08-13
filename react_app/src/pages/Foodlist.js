import React, { useEffect, useState, useMemo } from 'react';
import { Spin, Table, Button } from 'antd';
import { getFoodList, getTotal } from '../common/api'

export default function Foodlist() {
    return (
        <div style={{ display: 'flex' }}>
            <Lists />
            <Total />
        </div>
    )
}

//详情表
function Lists() {
    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})
    const [dataList, setDataList] = useState([])
    const [showLoading, setShowLoading] = useState(true)
    useEffect(() => {
        getFoodList().then(res => {
            setDataList(res.data)
            setShowLoading(false)
        })
    }, [])
    //展示数据
    const datas = useMemo(() => {
        let data = [];
        for (let i in dataList) {
            data.push({
                key: i,
                user_name: dataList[i].user_name,
                food_name: dataList[i].food_name,
                time: dataList[i].time,
                avatar_url: dataList[i].avatar_url
            })
        }
        return () => data
    }, [dataList])
    //过滤的选项数据
    const filters = useMemo(() => {
        let filter = [], obj = {};
        for (let i in dataList) {
            if (!obj[dataList[i].food_name]) {//去重
                filter.push({
                    text: dataList[i].food_name,
                    value: dataList[i].food_name
                })
                obj[dataList[i].food_name] = true;
            }
        }
        return () => filter
    }, [dataList])

    function handleChange(pagination, filters, sorter) {
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };
    //清除过滤
    function clearAll() {
        setFilteredInfo({})
        setSortedInfo({})
    };
    const columns = [
        {
            width: 60,
            title: '',
            dataIndex: 'avatar_url',
            key: 'avatar_url',
            render: (avatar_url) => <img src={avatar_url} alt="" width="40px" />
        },
        {
            title: '姓名',
            dataIndex: 'user_name',
            key: 'user_name',
            width: 120,
        },
        {
            title: '主菜',
            dataIndex: 'food_name',
            key: 'food_name',
            filters: filters(),
            filteredValue: filteredInfo.food_name || null,
            onFilter: (value, record) => record.food_name.includes(value),
            ellipsis: true,
            width: 200,
        },
        {
            title: '配菜',
            dataIndex: '',
            key: '',
            width: 120,
        },
        {
            title: '订餐时间',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            ellipsis: true,
        }
    ];
    return (
        <div style={{ width: '100vw' }}>
            <Spin tip="" spinning={showLoading}>
                <Table columns={columns} dataSource={datas()} onChange={handleChange} size="small" pagination={{ pageSize: 11 }}/>
            </Spin>
            <Button onClick={clearAll}>清除过滤</Button>
        </div>
    );

}

//统计表
function Total() {
    const [total, setTotal] = useState([])
    const [showLoading, setShowLoading] = useState(true)
    useEffect(() => {
        getTotal().then(res => {
            setTotal(res.data)
            setShowLoading(false)
        })
    }, [])
    //展示数据
    const datas = useMemo(() => {
        let data = [];
        for (let i in total) {
            data.push({
                key: i,
                name: total[i].food_name,
                count: total[i].num
            })
        }
        return () => data
    }, [total])
    const columns = [
        {
            title: '菜名',
            dataIndex: 'name',
        },
        {
            title: '数量/份',
            dataIndex: 'count',
            sorter: {
                compare: (a, b) => a.count - b.count,
                multiple: 3,
            },
        }
    ];
    return (
        <Spin tip="" spinning={showLoading}>
            <Table columns={columns} dataSource={datas()} style={{ width: '20vw', marginLeft: 30 }} pagination={false} />
        </Spin>
    )
}