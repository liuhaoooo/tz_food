<template>
	<view>
		<view class="select-foodlist">
			<list ref="list">
				<cell v-for="(item,index) in select_foodlist" :key="index">
					<view class="cell-container">
						<image 
						mode="aspectFit" 
						:src="item.avatar_url"
						@error="imageError"></image>
						<text>{{item.user_name}}</text>
						<text>{{item.food_name}}</text>
					</view>
				</cell>
			</list>
		</view>
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
				select_foodlist: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: ''
			})
			this.get_select_food().then(res => {
				this.select_foodlist = res
				uni.hideLoading()
				console.log(res)
			})
		},
		methods: {
			...mapActions(['get_select_food']),
		}
	}
</script>

<style>
	.cell-container{
		width: 100%;
		background: #FFFFFF;
		height: 3rem;
		display: flex;
		line-height: 3rem;
		border-bottom: #F1F1F1 solid .001rem;
	}
	.cell-container text{
		margin-left: 2rem;
	}
	.cell-container image{
		width: 2.3rem;
		height: 2.3rem;
		background-color: #eeeeee;
		margin: .3rem .3rem .3rem 1rem;
	}
</style>
