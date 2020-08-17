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
		hasUser: null,
		device_info: {}
	},
	getters: {
		device_info(state) {
			return state.device_info
		},
		isAuth(state) {
			return state.isAuth
		},
		openid(state) {
			return state.openid
		},
		hasUser(state) {
			return state.hasUser
		},
	},
	mutations: {
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
		HAS_USER(state, data) {
			state.hasUser = data
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
					console.log(info)
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
								appid,
								secret,
								code: res.code
							};
							uniRequest({
								url: interfaces.GET_OPENID,
								data,
								method: 'post',
							}).then(data => {
								state.commit('SET_OPENID', data.openid)
								state.commit('HAS_USER', data.hasUser)
								data.success ? resolve(data) : reject()
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
					method: 'post',
				}).then(res => {
					res.success ? resolve(res) : reject()
				}).catch(err => reject(err))
			})
		},
		//获取菜单列表
		get_foodlist(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_FOODLIST,
					data,
					method: 'post',
				}).then(res => {
					res.success ? resolve(res.data) : reject()
				}).catch(err => reject(err))
			})
		},
		//获取已选择菜单列表
		get_select_food(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_SELECT_FOOD,
					data,
					method: 'post',
				}).then(res => {
					res.success ? resolve(res.data) : reject()
				}).catch(err => reject(err))
			})
		},
		//选择食物
		select_food(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.SELECT_FOOD,
					data,
					method: 'post',
				}).then(res => {
					res.success ? resolve(res.data) : reject()
				}).catch(err => reject(err))
			})
		},
		//取消已选择的食物
		cancel_select(state, data) {
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.CANCEL_SELECT,
					data,
					method: 'post',
				}).then(res => {
					res.success ? resolve(res.success) : reject()
				}).catch(err => reject(err))
			})
		}
	}
})

export default store
