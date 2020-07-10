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
		openid: ""
	},
	getters: {
		openid(state) {
			return state.openid
		}
	},
	mutations: {
		SET_OPENID(state, data) {
			state.openid = data
			try {
				uni.setStorageSync('openid', data);
			} catch (e) {}
		},
	},
	actions: {
		//获取用户openid
		get_openid(state, data) {
			wx.login({
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
						})
					}
				},
				fail: err => {
					throw err;
				}
			});
		},
	}
})

export default store
