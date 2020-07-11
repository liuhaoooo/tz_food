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
		hasUser:false
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
		HAS_USER(state,data){
			state.hasUser = data
		}
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
							console.log(data)
							state.commit('SET_OPENID', data.openid)
							state.commit('HAS_USER', data.hasUser)
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
