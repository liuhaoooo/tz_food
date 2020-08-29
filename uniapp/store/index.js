import Vue from 'vue'
import Vuex from 'vuex'
import uniRequest from '../request/request.js'
import {
	interfaces,
	secret,
	appid
} from '../config/config.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isAuth: false,
		openid: "",
		userData: {},
		device_info: {},
		location: ""
	},
	getters: {
		device_info(state) {
			return state.device_info
		},
		location(state) {
			return state.location == "广州市" ? 0 : 1
		},
		isAuth(state) {
			return state.isAuth
		},
		openid(state) {
			return state.openid
		},
		userData(state) {
			return state.userData
		},
	},
	mutations: {
		SET_LOCATION(state, data) {
			state.location = data
		},
		SET_INFO(state, data) {
			state.device_info = data
		},
		SET_AUTH(state, data) {
			state.isAuth = data
		},
		SET_OPENID(state, data) {
			state.openid = data
			try {
				uni.setStorageSync('openid', data);
			} catch (e) { }
		},
		USER_DATA(state, data) {
			state.userData = data
		}
	},
	actions: {
		//获取手机信息
		get_device_info(state, data) {
			uni.getSystemInfo({
				success: (res) => {
					let info = {
						model: res.model,
						pixelRatio: res.pixelRatio,
						windowWidth: res.windowWidth,
						windowHeight: res.windowHeight,
						language: res.language,
						version: res.version,
						platform: res.platform
					}
					state.commit('SET_INFO', info)
				}
			});
		},
		//获取用户openid
		get_openid(state, data) {
			return new Promise((resolve, reject) => {
				uni.login({
					success: res => {
						if (res.code) {
							let data = {
								code: res.code
							};
							uniRequest({
								url: interfaces.GET_OPENID,
								data,
								method: 'GET',
							}).then(res => {
								console.log(res.data)
								state.commit('SET_OPENID', res.data.openid)
								state.commit('USER_DATA', res.data)
								resolve(res.data)
							}).catch(err => reject(err))
						}
					},
					fail: err => reject(err)
				});
			})
		},
		//设置用户
		set_user(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.SET_USER,
					data,
					method: 'GET',
				}).then(res => {
					resolve(res)
				}).catch(err => reject(err))
			})
		},
		//获取商家
		get_buslist(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_BUS,
					data,
					method: 'GET',
				}).then(res => {
					resolve(res.data)
				}).catch(err => reject(err))
			})
		},
		//获取菜单列表
		get_foodlist(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_FOODLIST,
					data,
					method: 'GET',
				}).then(res => {
					resolve(res.data)
				}).catch(err => reject(err))
			})
		},
		//点餐
		select_food(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.SELECT_FOOD,
					data,
					method: 'GET',
				}).then(res => {
					if (res.code == -2) {
						uni.showToast({
							title: "你已经点过餐了",
							icon: "none",
							duration: 1000
						});
						reject()
					}
					if(res.code==-3){
						uni.showToast({
							title: "非点餐时间",
							icon: "none",
							duration: 1000
						});
						reject()
					}
					resolve(res.data)
				}).catch(err => reject(err))
			})
		},
		//获取已选择菜单列表
		get_select_food(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_SELECT_FOOD,
					data,
					method: 'GET',
				}).then(res => {
					resolve(res.data)
				}).catch(err => reject(err))
			})
		},
		//取消点餐
		cancel_select(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.CANCEL_SELECT,
					data,
					method: 'GET',
				}).then(res => {
					if(res.code==-3){
						uni.showToast({
							title: "非点餐时间不能取消",
							icon: "none",
							duration: 1000
						});
						reject()
					}
					res.code == 0 && resolve(res)
				}).catch(err => reject(err))
			})
		}
	}
})

export default store
