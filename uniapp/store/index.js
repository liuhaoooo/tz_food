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
		openid: "",
		hasUser: null
	},
	getters: {
		openid(state) {
			return state.openid
		},
		hasUser(state) {
			return state.hasUser
		}
	},
	mutations: {
		SET_OPENID(state, data) {
			state.openid = data
			try {
				uni.setStorageSync('openid', data);
			} catch (e) {}
		},
		HAS_USER(state, data) {
			state.hasUser = data
		}
	},
	actions: {
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
		get_foodlist(state, data){
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
		get_select_food(state, data){
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.GET_SELECT_FOOD,
					data,
					method: 'post',
				}).then(res => {
					console.log(res)
					res.success ? resolve(res.data) : reject()
				}).catch(err => reject(err))
			})
		},
		//选择食物
		select_food(state, data){
			return new Promise((resolve, reject) => {
				uniRequest({
					url: interfaces.SELECT_FOOD,
					data,
					method: 'post',
				}).then(res => {
					console.log(res)
					res.success ? resolve(res.data) : reject()
				}).catch(err => reject(err))
			})
		}
	}
})

export default store
