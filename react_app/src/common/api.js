import axiosRequest from './axiosRequest'
export function getFoodList() {
    return axiosRequest.request({
        url: 'getSelectFood',
        method: 'post'
    })
}
