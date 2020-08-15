import axiosRequest from './axiosRequest'
/**
 * 获取已选择的食物
 */
export function getFoodList() {
    return axiosRequest.request({
        url: 'getSelectFood',
        method: 'post'
    })
}
/**
 * 统计食物
 */
export function getTotal() {
    return axiosRequest.request({
        url: 'getTotal',
        method: 'post'
    })
}
/**
 * 获取食物
 */
export function getFood(data){
    return axiosRequest.request({
        url: 'getFoodList',
        method: 'post',
        data
    })
}