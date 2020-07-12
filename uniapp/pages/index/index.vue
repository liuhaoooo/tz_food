<template>
	<view>
		<uni-popup ref="dialogInput" type="dialog" maskClick="false">
			<uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="submit">
			</uni-popup-dialog>
		</uni-popup>
		<h2>主菜</h2>
		<uni-grid column="2" :show-border="false">
			<uni-grid-item v-for="(item,index) in foodList" :key="item.food_id">
				<view class="foodList-content">
					<text class="text">{{item.food_name}}</text>
					<!-- <image 
					style="width: 100%; height: 100%;" 
					mode="center"
					:src="item.food_image!=null?item.food_image:default_img">
					</image> -->
					<dh-image 
						mode="center"
						:src="item.food_image!=null?item.food_image:default_img"
						:errorSrc="default_img">
					</dh-image>
				</view>
			</uni-grid-item>
		</uni-grid>
		<h2>副菜</h2>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import dhImage from '@/components/dh-image/dh-image'
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
			uniGrid,
			uniGridItem,
			dhImage
		},
		data() {
			return {
				userName: "",
				foodList: [],
				default_img: require('@/static/images/default_food.png')
			}
		},
		computed: {
			...mapGetters(['openid', 'hasUser'])
		},
		onLoad() {
			this.getFoodlist()
			this.get_openid().then(() => !this.hasUser && this.$refs.dialogInput.open())
		},
		methods: {
			...mapActions(['set_user', 'get_openid', 'get_foodlist']),
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
			submit(done, val) {
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
		}
	}
</script>

<style>
	.foodList-content {
		width: 90%;
		height: 90%;
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>
