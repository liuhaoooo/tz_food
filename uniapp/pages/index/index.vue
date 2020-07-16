<template>
	<view class="main_index">
		<view class="foodList-content">
			<uni-popup ref="dialogAuth" type="dialog" maskClick="false">
				<view class="auth_content">
					<view>
						需要授权才能继续
					</view>
					<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
				</view>
			</uni-popup>
			<uni-popup ref="dialogInput" type="dialog" maskClick="false">
				<uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="setUser">
				</uni-popup-dialog>
			</uni-popup>
			<h2>主菜类（{{foodList[0].bus_name}})</h2>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in foodList" :key="item.food_id">
						<view style="display: flex;margin-bottom: 1rem;margin-top: 1em;">
							<radio :value="item.food_id" :checked="index === current" />
							<view style="margin-left: 2em;">{{item.food_name}}</view>
						</view>
					</label>
				</radio-group>
			</view>
			<h2>副菜类</h2>
			<h2>备注</h2>
			<template>
				<view class="container">
					<editor @input="editor_input" class="ql-container" placeholder="添加备注..." v-model="text"></editor>
				</view>
			</template>
			<button type="primary" @tap="click_submit">提交</button>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
		},
		data() {
			return {
				userName: '',
				foodList: [],
				current: 0,
				food_id: '1',
				text: '',
				avatarUrl:''
			}
		},
		computed: {
			...mapGetters(['openid', 'hasUser'])
		},
		onLoad() {
			this.get_auth()
			this.getFoodlist()
			this.get_openid().then(() => {
				if (this.hasUser.is_select == 1) { //判断用户是否已选菜
					uni.reLaunch({
						url: '/pages/selectList/index'
					});
				}
			})
		},
		methods: {
			...mapActions(['set_user', 'get_openid', 'get_foodlist', 'select_food']),
			//获取权限
			get_auth() {
				const _this = this
				uni.getUserInfo({
					provider: 'weixin',
					success: (res) => {
						_this.avatarUrl = res.userInfo.avatarUrl
					},
					fail: (err) => {
						_this.$refs.dialogAuth.open()
					}
				});
			},
			//是否授权回调
			bindGetUserInfo(e){
				if(e.target.errMsg==='getUserInfo:ok'){
					this.get_auth()
					this.$refs.dialogAuth.close()
				}else{
					uni.showToast({
						title: '需要授权',
						icon: 'none',
						duration: 1000
					});
				}
				
			},
			//获取菜单
			getFoodlist() {
				uni.showLoading({
					title: ''
				})
				let data = {
					busId: '1'
				}
				this.get_foodlist(data).then(res => {
					this.foodList = res
					uni.hideLoading()
				})
			},
			//选择菜单触发
			radioChange(evt) {
				this.food_id = evt.target.value
				for (let i in this.foodList) {
					if (this.foodList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			//设置姓名
			setUser(done, val) {
				uni.showLoading({
					title: '设置中'
				})
				this.userName = val
				if (!val) {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
						duration: 1000
					});
					return
				}
				let data = {
					userName: val,
					openid: this.openid,
					avatarUrl:this.avatarUrl
				}
				this.set_user(data).then(res => {
					uni.hideLoading()
					this.submit()
					done()
				})
			},
			//备注输入框
			editor_input(e) {
				this.text = e.target.text
			},
			//点击提交按钮（做判断）
			click_submit() {
				if (!this.hasUser) {
					this.$refs.dialogInput.open()
					return
				} else {
					this.submit()
				}
			},
			//提交数据
			submit() {
				uni.showLoading({
					title: ''
				})
				let data = {
					text: this.text,
					food_id: this.food_id,
					openid: this.openid
				}
				this.select_food(data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '选择成功',
						duration: 1000
					});
					uni.reLaunch({
						url: '/pages/selectList/index'
					});
				})
			},
		}
	}
</script>

<style>
	.main_index {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.foodList-content {
		width: 90%;
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	.auth_content {
		width: 60vw;
		height: 20vh;
		margin: auto;
		position: relative;
		left: 0;
		right: 0;
		overflow: hidden;
		top: 0;
		bottom: 0;
		background: #FFFFFF;
		border-radius: .8rem;
	}
	.auth_content view{
		color: #333;
		width: 100%;
		text-align: center;
		margin-top: 1.5rem;
	}
	.auth_content button{
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		font-size: 1rem;
		background: #F1F1F1;
		border-top: #C0C0C0 solid .001rem;
		border-radius: 0 0 .8rem .8rem;
	}
</style>
