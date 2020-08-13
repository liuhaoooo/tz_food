<template>
	<view>
		<view class="select-foodlist">
			<list>
				<cell v-for="(item,index) in select_foodlist" :key="index">
					<view class="cell-container" :style="item.openid==openid?'background-color:#b4f9c4b8':''">
						<image mode="aspectFit" :src="item.avatar_url" @error="imageError"></image>
						<text style="width: 15%;">{{item.user_name}}</text>
						<text style="width: 40%;">{{item.food_name}}</text>
						<text>{{item.time | get_date}}</text>
					</view>
				</cell>
			</list>
		</view>
		<button type="warn" @click="cancel" class="footer-button" :disabled="disable">{{btn_text}}</button>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				select_foodlist: [],
				btn_text: "取消",
				timer: null,
				disable: false,
				offset: 0,
			}
		},
		computed: {
			...mapGetters(['openid'])
		},
		filters: {
			get_date(val) {
				let date = new Date(val)
				return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			}
		},
		onLoad() {
			clearInterval(this.timer);
			this.disable = true
			this.countdown(10)
			this.select_foodlist = []
			this.offset = 0
			this.getData()
		},
		onReachBottom(){
			this.offset += 15
			this.getData()
		},
		onPullDownRefresh(){
			this.select_foodlist = []
			this.offset = 0
			this.getData()
		},
		methods: {
			...mapActions(['get_select_food', 'cancel_select']),
			getData() {
				this.get_select_food({
					offset: this.offset
				}).then(res => {
					for (let item of res) {
						this.select_foodlist.push(item)
					}
					uni.stopPullDownRefresh();
				})
			},
			cancel() {
				uni.showLoading({
					title: ''
				})
				this.cancel_select({
					openid: this.openid
				}).then(res => {
					if (res) {
						uni.reLaunch({
							url: '/pages/index/index'
						});
					} else {
						uni.showToast({
							title: '取消失败',
							icon: 'none',
							duration: 1000
						});
					}
					uni.hideLoading()
				})
			},
			//倒计时
			countdown(sec) {
				this.timer = setInterval(() => {
					this.btn_text = sec;
					sec--;
					if (sec == "00") {
						this.btn_text = "取消";
						this.disable = false
						clearInterval(this.timer);
						return;
					}
					if (sec < 10) {
						sec = "0" + sec;
					}
					this.btn_text = sec;
				}, 1000);
			}
		}
	}
</script>

<style>
	.select-foodlist {
		height: 85vh;
	}

	.cell-container {
		width: 100%;
		background: #FFFFFF;
		height: 3.5rem;
		display: flex;
		line-height: 3.5rem;
		border-bottom: #F1F1F1 solid .001rem;
	}

	.cell-container text {
		margin-left: .4rem;
		margin-right: .4rem;
	}

	.cell-container image {
		width: 2.8rem;
		height: 2.8rem;
		background-color: #eeeeee;
		margin: .3rem .3rem .3rem 1rem;
	}

	.footer-button {
		width: 140rpx;
		height: 140rpx;
		line-height: 140rpx;
		border-radius: 50%;
		position: fixed;
		right: 30rpx;
		bottom: 2rem;
		margin: auto;
	}
</style>
