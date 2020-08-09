import React, { useEffect, useState, useMemo } from 'react';
import { Avatar, Table, Button } from 'antd';
import { getFoodList } from '../common/api'

function Foodlist() {
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        getFoodList().then(res => {
            console.log(res)
            setDataList(res.data)
        })
    }, [])
    return (
        <div style={{ display: 'flex' }}>
            <Lists dataList={dataList} />
            <Total />
        </div>
    )
}
export default Foodlist

//详情表
function Lists({ dataList }) {
    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})
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
    const filters = useMemo(() => {
        let filters = [];
        for (let i in dataList) {
            filters.push({
                text: dataList[i].food_name,
                value: dataList[i].food_name
            })
        }
        return () => filters
    }, [dataList])
    function handleChange(pagination, filters, sorter) {
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    };
    function clearAll() {
        setFilteredInfo({})
        setSortedInfo({})
    };
    const columns = [
        {
            width:60,
            title: '',
            dataIndex: 'avatar_url',
            key: 'avatar_url',
            render: (avatar_url) => <img src={avatar_url} alt="" width="40px" />
        },
        {
            title: '姓名',
            dataIndex: 'user_name',
            key: 'user_name',
            width:130,
        },
        {
            title: '主菜',
            dataIndex: 'food_name',
            key: 'food_name',
            filters: filters(),
            filteredValue: filteredInfo.food_name || null,
            onFilter: (value, record) => record.food_name.includes(value),
            ellipsis: true,
            width:200,
        },
        {
            title: '配菜',
            dataIndex: '',
            key: '',
            width:130,
        },
        {
            title: '订餐时间',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: '编辑',
            width:130,
        },
    ];
    return (
        <div style={{ width: '100vw' }}>
            <Table columns={columns} dataSource={datas()} onChange={handleChange} />
            <Button onClick={clearAll}>清除过滤</Button>
        </div>
    );

}

//统计表
function Total() {
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
    const data = [
        {
            key: '1',
            name: '萝卜牛腩',
            count: 2
        },
        {
            key: '1',
            name: '剁椒鱼块',
            count: 3
        },
        {
            key: '1',
            name: '孜然鱿鱼',
            count: 5
        },
        {
            key: '2',
            name: '烧鸭',
            count: 1
        }
    ];
    return (<Table columns={columns} dataSource={data} style={{ width: '50vw', marginLeft: 30 }} pagination={false} />)
}