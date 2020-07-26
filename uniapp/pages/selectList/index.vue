<template>
	<view>
		<view class="select-foodlist">
			<list ref="list">
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
		<button type="warn" @click="cancel" class="cancelBtn" :disabled="disable">{{btn_text}}</button>
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
				btn_text:"取消",
				timer:null,
				disable:false
			}
		},
		computed: {
			...mapGetters(['openid', 'hasUser'])
		},
		filters: {
			get_date(val) {
				let date = new Date(val)
				return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			}
		},
		onLoad() {
			clearInterval(this.timer);
			uni.showLoading({
				title: ''
			})
			this.disable = true
			this.countdown(10)
			this.get_select_food().then(res => {
				this.select_foodlist = res
				uni.hideLoading()
				console.log(res)
			})
		},
		methods: {
			...mapActions(['get_select_food', 'cancel_select']),
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
					this.btn_text = `(${sec})秒后可取消`;
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
					this.btn_text = `(${sec})秒后可取消`;
				}, 1000);
			},
		}
	}
</script>

<style>
	.cell-container {
		width: 100%;
		background: #FFFFFF;
		height: 3rem;
		display: flex;
		line-height: 3rem;
		border-bottom: #F1F1F1 solid .001rem;
	}

	.cell-container text {
		margin-left: .4rem;
		margin-right: .4rem;
	}

	.cell-container image {
		width: 2.3rem;
		height: 2.3rem;
		background-color: #eeeeee;
		margin: .3rem .3rem .3rem 1rem;
	}

	.cancelBtn {
		width: 90%;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 2em;
		margin: auto;
	}
</style>
