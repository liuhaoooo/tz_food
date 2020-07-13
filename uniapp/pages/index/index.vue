<template>
	<view class="foodList-content">
		<uni-popup ref="dialogInput" type="dialog" maskClick="false">
			<uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="setUser">
			</uni-popup-dialog>
		</uni-popup>
		<h2>主菜（{{foodList[0].bus_name}})</h2>
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
		<h2>副菜</h2>
		<h2>备注</h2>
		<template>
			<view class="container">
				<editor @input="editor_input" class="ql-container" placeholder="添加备注..." v-model="text"></editor>
			</view>
		</template>
		<button type="primary" @tap="submit">提交</button>
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
				text: ''
			}
		},
		computed: {
			...mapGetters(['openid', 'hasUser'])
		},
		onLoad() {
			this.getFoodlist()
			this.get_openid().then(() => {
				if (!this.hasUser) {
					this.$refs.dialogInput.open()
					return
				}
				//判断用户是否已选菜
				if (this.hasUser.is_select == 1) {
					
				}
				this.get_select_food({openid:this.openid})
			})
		},
		methods: {
			...mapActions(['set_user', 'get_openid', 'get_foodlist','get_select_food','select_food']),
			getFoodlist() {
				uni.showLoading({
					title: ''
				})
				let data = {
					busId: '1'
				}
				this.get_foodlist(data).then(res => {
					console.log(res)
					this.foodList = res
					uni.hideLoading()
				})
			},
			radioChange(evt) {
				this.food_id = evt.target.value
				for (let i in this.foodList) {
					if (this.foodList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
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
					openid: this.openid
				}
				this.set_user(data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '设置成功',
						duration: 1000
					});
					done()
				})
			},
			editor_input(e) {
				this.text = e.target.text
			},
			submit() {
				let data = {
					text:this.text,
					food_id:this.food_id,
					openid:this.openid
				}
				this.select_food(data)
			},
		}
	}
</script>

<style>
	.foodList-content {
		width: 90%;
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>
